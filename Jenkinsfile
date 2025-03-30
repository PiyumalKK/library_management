pipeline {
    agent {
        docker {
            image 'docker:latest'
            args '--privileged -v /var/run/docker.sock:/var/run/docker.sock'
            // Start container in the workspace directory explicitly
            reuseNode true
        }
    }
    
    environment {
        AZURE_CREDENTIALS = credentials('azure-credentials')
        AZ_TENANT_ID = '4f7d0492-1764-4824-8f60-f15e6d51cd70'
    }
    
    stages {
        stage('Prepare Environment') {
            steps {
                // Install essential tools in the Docker container
                sh 'apk add --no-cache git docker-compose python3 py3-pip'
                sh 'pip install azure-cli'
            }
        }
        
        stage('Checkout Code') {
            steps {
                // Use Jenkins' built-in checkout mechanism for SCM
                checkout([$class: 'GitSCM', 
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/PiyumalKK/library_management.git']]
                ])
            }
        }
        
        stage('Build Docker Images') {
            steps {
                sh 'cd Compose && docker-compose build'
                sh 'cd Compose && docker-compose push'
            }
        }
        
        stage('Deploy to Azure') {
            steps {
                sh '''
                    az login --service-principal \
                        -u ${AZURE_CREDENTIALS_USR} \
                        -p ${AZURE_CREDENTIALS_PSW} \
                        --tenant ${AZ_TENANT_ID}
                    az aks get-credentials --resource-group Devops --name librarydev --overwrite-existing
                    kubectl apply -f kubernetes/deployment.yml
                '''
            }
        }
    }
}