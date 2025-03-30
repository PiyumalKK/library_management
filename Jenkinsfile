pipeline {
    agent {
        docker {
            image 'docker:latest'
            args '--privileged -v /var/run/docker.sock:/var/run/docker.sock'
            reuseNode true
        }
    }
    
    environment {
        AZURE_CREDENTIALS = credentials('azure-credentials')
        AZ_TENANT_ID = '4f7d0492-1764-4824-8f60-f15e6d51cd70'
        ACR_NAME = 'LibraryContainer'  // Replace with your ACR name
        ACR_LOGIN_SERVER = "${ACR_NAME}.azurecr.io"
    }
    
    stages {
        stage('Prepare Environment') {
            steps {
                // Install Git first
                sh 'apk add --no-cache git'
                // Then install the rest
                sh 'apk add --no-cache docker-compose python3 py3-pip'
                sh 'pip install azure-cli'
            }
        }
        
        stage('Checkout Code') {
            steps {
                // Clean workspace before checkout
                deleteDir()
                
                // Explicit git checkout
                sh 'git clone https://github.com/PiyumalKK/library_management.git .'
            }
        }
        
        stage('Login to ACR') {
            steps {
                sh '''
                    az login --service-principal \
                        -u ${AZURE_CREDENTIALS_USR} \
                        -p ${AZURE_CREDENTIALS_PSW} \
                        --tenant ${AZ_TENANT_ID}
                    
                    # Login to ACR
                    az acr login --name ${ACR_NAME}
                '''
            }
        }
        
        stage('Build and Tag Docker Images') {
            steps {
                sh '''
                    # Navigate to Compose directory
                    cd Compose
                    
                    # Modify docker-compose.yml to use ACR tags if needed
                    # You might need to update image names in compose file to include ACR server
                    # For example: ${ACR_LOGIN_SERVER}/your-image-name:tag
                    
                    # Build the images
                    docker-compose build
                    
                    # Tag images for ACR if not already in docker-compose
                    # Example: docker tag local-image:tag ${ACR_LOGIN_SERVER}/remote-image:tag
                '''
            }
        }
        
        stage('Push to ACR') {
            steps {
                sh '''
                    cd Compose
                    
                    # Push to ACR
                    docker-compose push
                    
                    # Alternatively, you can push specific images:
                    # docker push ${ACR_LOGIN_SERVER}/image1:tag
                    # docker push ${ACR_LOGIN_SERVER}/image2:tag
                '''
            }
        }
        
        stage('Deploy to AKS') {
            steps {
                sh '''
                    # Get AKS credentials
                    az aks get-credentials --resource-group Devops --name librarydev --overwrite-existing
                    
                    # Apply Kubernetes manifests
                    kubectl apply -f kubernetes/deployment.yml
                '''
            }
        }
    }
}