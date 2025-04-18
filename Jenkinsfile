

pipeline {
    agent any

    environment {
        AZURE_CREDENTIALS = credentials('azure-credentials')
        AZ_TENANT_ID = '4f7d0492-1764-4824-8f60-f15e6d51cd70'
        ACR_NAME = 'LibraryContainer'
        ACR_LOGIN_SERVER = "librarycontainer.azurecr.io"
    }

    stages {
        stage('Prepare Environment') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            sudo apt update
                            # Install Python 3.11 and required packages
                            sudo apt install -y git docker-compose python3.11 python3.11-venv python3.11-distutils
                            
                            # Always create a fresh virtual environment
                            rm -rf venv
                            python3.11 -m venv venv
                            . venv/bin/activate
                            
                            # Upgrade pip and install azure-cli
                            pip install --upgrade pip
                            pip install azure-cli
                        '''
                    } else {
                        bat '''
                            echo Installing required software...
                            choco install git docker-cli kubernetes-cli -y
                            pip install azure-cli
                        '''
                    }
                }
            }
        }

        stage('Checkout Code') {
            steps {
                deleteDir()
                git url: 'https://github.com/PiyumalKK/library_management.git', branch: 'master'
            }
        }

        stage('Login to ACR') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            # Log in using service principal
                            az login --service-principal -u $AZURE_CREDENTIALS_USR -p $AZURE_CREDENTIALS_PSW --tenant $AZ_TENANT_ID
                            az acr login -n $ACR_NAME --expose-token
                            
                            # Get admin credentials and login to Docker
                            ACR_USER=$(az acr credential show -n $ACR_NAME --query "username" -o tsv)
                            ACR_PWD=$(az acr credential show -n $ACR_NAME --query "passwords[0].value" -o tsv)
                            docker login $ACR_LOGIN_SERVER -u $ACR_USER -p $ACR_PWD
                        '''
                    } else {
                        bat '''
                            az login --service-principal -u %AZURE_CREDENTIALS_USR% -p %AZURE_CREDENTIALS_PSW% --tenant %AZ_TENANT_ID%
                            az acr login -n %ACR_NAME% --expose-token
                            
                            REM Get direct admin credentials and use them for Docker login
                            FOR /F "tokens=*" %%a IN ('az acr credential show -n %ACR_NAME% --query "username" -o tsv') DO SET ACR_USER=%%a
                            FOR /F "tokens=*" %%a IN ('az acr credential show -n %ACR_NAME% --query "passwords[0].value" -o tsv') DO SET ACR_PWD=%%a
                            docker login %ACR_LOGIN_SERVER% -u %ACR_USER% -p %ACR_PWD%
                        '''
                    }
                }
            }
        }

        stage('Build Backend JAR') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            cd Backend
                            mvn clean package
                        '''
                    } else {
                        dir('Backend') {
                            bat 'mvn clean package'
                        }
                    }
                }
            }
        }

        stage('Build and Tag Docker Images') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            cd Compose
                            docker-compose build
                        '''
                    } else {
                        bat '''
                            cd Compose
                            docker-compose build
                        '''
                    }
                }
            }
        }

        stage('Push to ACR') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            cd Compose
                            docker-compose push
                        '''
                    } else {
                        bat '''
                            cd Compose
                            docker-compose push
                        '''
                    }
                }
            }
        }

        stage('Create Kubernetes Secret for ACR') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            # Get AKS credentials
                            az aks get-credentials --resource-group Devops --name library --overwrite-existing

                            # Verify the current context
                            kubectl config current-context

                            # Get ACR credentials
                            ACR_USER=$(az acr credential show -n $ACR_NAME --query "username" -o tsv)
                            ACR_PWD=$(az acr credential show -n $ACR_NAME --query "passwords[0].value" -o tsv)
                            
                            # Create secret for Kubernetes ACR registry
                            kubectl create secret docker-registry acr-auth \\
                              --docker-server=$ACR_LOGIN_SERVER \\
                              --docker-username=$ACR_USER \\
                              --docker-password=$ACR_PWD \\
                              --dry-run=client -o yaml | kubectl apply -f -
                        '''
                    } else {
                        bat '''
                            REM Get AKS credentials
                            az aks get-credentials --resource-group Devops --name library --overwrite-existing

                            REM Verify the current context
                            kubectl config current-context

                            REM Get ACR credentials
                            FOR /F "tokens=*" %%a IN ('az acr credential show -n %ACR_NAME% --query "username" -o tsv') DO SET ACR_USER=%%a
                            FOR /F "tokens=*" %%a IN ('az acr credential show -n %ACR_NAME% --query "passwords[0].value" -o tsv') DO SET ACR_PWD=%%a
                            
                            REM Create secret for Kubernetes ACR registry
                            kubectl create secret docker-registry acr-auth ^
                              --docker-server=%ACR_LOGIN_SERVER% ^
                              --docker-username=%ACR_USER% ^
                              --docker-password=%ACR_PWD% ^
                              --dry-run=client -o yaml | kubectl apply -f -
                        '''
                    }
                }
            }
        }

        stage('Redeploy Both Backend and Frontend') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            echo "Step 1: Getting AKS credentials..."
                            az aks get-credentials --resource-group Devops --name library --overwrite-existing
                            
                            echo "Step 2: Current context:"
                            kubectl config current-context
                            
                            echo "Step 3: Using context 'library':"
                            kubectl config use-context library
                            
                            echo "Step 4: Full kubeconfig view:"
                            kubectl config view
                            
                            echo "Step 5: Applying deployment YAML..."
                            kubectl apply -f kubernetes/deployment.yml
                            
                            echo "Step 6: Listing current deployments:"
                            kubectl get deployments
                            
                            echo "Step 7: Restarting mysql-deployment..."
                            kubectl rollout restart deployment mysql-deployment
                            
                            echo "Step 8: Restarting my-app-deployment..."
                            kubectl rollout restart deployment my-app-deployment
                            
                            echo "Step 9: Monitoring rollout status for mysql-deployment..."
                            kubectl rollout status deployment mysql-deployment
                            
                            
                            
                            echo "Step 11: Checking pod status..."
                            kubectl get pods
                            
                            echo "Step 12: Inspecting mysql-deployment for restartedAt annotation..."
                            kubectl get deployment mysql-deployment -o yaml | grep restartedAt
                        '''
                    } else {
                        bat '''
                            echo Step 1: Getting AKS credentials...
                            az aks get-credentials --resource-group Devops --name library --overwrite-existing
                            
                            echo Step 2: Current context:
                            kubectl config current-context
                            
                            echo Step 3: Using context "library":
                            kubectl config use-context library
                            
                            echo Step 4: Full kubeconfig view:
                            kubectl config view
                            
                            echo Step 5: Applying deployment YAML...
                            kubectl apply -f kubernetes/deployment.yml
                            
                            echo Step 6: Listing current deployments:
                            kubectl get deployments
                            
                            echo Step 7: Restarting mysql-deployment...
                            kubectl rollout restart deployment mysql-deployment
                            
                            echo Step 8: Restarting my-app-deployment...
                            kubectl rollout restart deployment my-app-deployment
                            
                            echo Step 9: Monitoring rollout status for mysql-deployment...
                            kubectl rollout status deployment mysql-deployment
                            
                           
                            
                            echo Step 11: Checking pod status...
                            kubectl get pods
                            
                            echo Step 12: Inspecting mysql-deployment for restartedAt annotation...
                            kubectl get deployment mysql-deployment -o yaml | findstr restartedAt
                        '''
                    }
                }
            }
        }

        

    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for details.'
        }
        always {
            echo 'Pipeline execution completed. Workspace preserved for inspection.'
        }
        unstable {
            echo 'Pipeline executed but some stages were unstable.'
        }
    }
}