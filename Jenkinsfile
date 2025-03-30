pipeline {
    agent {
        docker {
            image 'docker:dind' // Consider using a custom image that includes docker-compose and azure-cli
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    environment {
        // Azure service principal credentials stored in Jenkins with ID 'azure-credentials'
        AZURE_CREDENTIALS = credentials('azure-credentials')
        // Your Azure Tenant ID as obtained from your service principal creation
        AZ_TENANT_ID = '4f7d0492-1764-4824-8f60-f15e6d51cd70'
        // (Optional) If you have ACR credentials stored, you can define them here too.
        // For example: ACR_CREDENTIALS = credentials('acr-credentials')
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/PiyumalKK/library_management.git'
            }
        }
        
        stage('Build Docker Images') {
            steps {
                // Install docker-compose if not present (using apk on Alpine)
                sh 'apk add --no-cache docker-compose'
                // Build images with docker-compose (make sure your Compose file tags images with your ACR URL)
                sh 'cd Compose && docker-compose build'
                // Push images to your ACR; ensure that your docker-compose file has the correct ACR image tags
                sh 'cd Compose && docker-compose push'
            }
        }
        
        stage('Deploy to Azure') {
            steps {
                // Install azure-cli dependencies if not already present
                sh 'apk add --update python3 py3-pip && pip install azure-cli'
                // Login to Azure using your service principal credentials from Jenkins
                sh '''
                    az login --service-principal \
                        -u ${AZURE_CREDENTIALS_USR} \
                        -p ${AZURE_CREDENTIALS_PSW} \
                        --tenant ${AZ_TENANT_ID}
                '''
                // Retrieve AKS credentials for your cluster in the 'Devops' resource group
                sh 'az aks get-credentials --resource-group Devops --name librarydev --overwrite-existing'
                // Apply your Kubernetes deployment configuration
                sh 'kubectl apply -f kubernetes/deployment.yml'
            }
        }
    }
}
