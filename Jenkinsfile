pipeline {
    agent any

    environment {
        AZURE_CREDENTIALS = credentials('azure-credentials')
        AZ_TENANT_ID = '4f7d0492-1764-4824-8f60-f15e6d51cd70'
        ACR_NAME = 'LibraryContainer'
        ACR_LOGIN_SERVER = "${ACR_NAME}.azurecr.io"
    }

    stages {
        stage('Prepare Environment') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            sudo apt update
                            sudo apt install -y git docker-compose python3 python3-pip
                            pip3 install azure-cli
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
                bat '''
                    az login --service-principal -u %AZURE_CREDENTIALS_USR% -p %AZURE_CREDENTIALS_PSW% --tenant %AZ_TENANT_ID%
                    az acr login --name %ACR_NAME%
                '''
            }
        }
        stage('Build Backend JAR') {
    steps {
        dir('Backend') {  // Go to Backend directory
            bat 'mvn clean package'  // Run Maven build
        }
    }
}


        stage('Build and Tag Docker Images') {
            steps {
                bat '''
                    cd Compose
                    docker-compose build
                '''
            }
        }

        stage('Push to ACR') {
            steps {
                bat '''
                    cd Compose
                    docker-compose push
                '''
            }
        }

        stage('Deploy to AKS') {
            steps {
                bat '''
                    az aks get-credentials --resource-group Devops --name librarydev --overwrite-existing
                    kubectl apply -f kubernetes/deployment.yml
                '''
            }
        }
    }
}
