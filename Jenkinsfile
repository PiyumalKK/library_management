pipeline {
    agent {
        docker {
            image 'docker:latest'
            args '--privileged -v /var/run/docker.sock:/var/run/docker.sock'
            // Ensure the agent runs as root if needed for privileged operations
            reuseNode false
        }
    }
    
    environment {
        AZURE_CREDENTIALS = credentials('azure-credentials')
        AZ_TENANT_ID = '4f7d0492-1764-4824-8f60-f15e6d51cd70'
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/PiyumalKK/library_management.git'
            }
        }
        
        stage('Build Docker Images') {
            steps {
                // Ensure apk is available (docker:latest is based on Alpine)
                sh 'apk add --no-cache docker-compose'
                sh 'cd Compose && docker-compose build'
                sh 'cd Compose && docker-compose push'
            }
        }
        
        stage('Deploy to Azure') {
            steps {
                sh 'apk add --update python3 py3-pip && pip install azure-cli'
                sh '''
                    az login --service-principal \
                        -u ${AZURE_CREDENTIALS_USR} \
                        -p ${AZURE_CREDENTIALS_PSW} \
                        --tenant ${AZ_TENANT_ID}
                '''
                sh 'az aks get-credentials --resource-group Devops --name librarydev --overwrite-existing'
                sh 'kubectl apply -f kubernetes/deployment.yml'
            }
        }
    }
}