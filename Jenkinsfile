pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                // Replace with your repository URL if needed
                git 'https://github.com/PiyumalKK/library_management.git'
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    // Build images using Docker Compose
                    sh 'docker-compose -f Compose/docker-compose.yml build'
                }
            }
        }
        stage('Deploy to Azure') {
            steps {
                script {
                    // Get AKS credentials (replace placeholders with your actual values)
                    sh 'az aks get-credentials --resource-group Devops --name librarydev --overwrite-existing'
                    // Apply your Kubernetes deployment file
                    sh 'kubectl apply -f kubernetes/deployment.yml'
                }
            }
        }
    }
}
