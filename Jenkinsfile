pipeline {
    agent {
        docker {
            image 'maven:3.8.1-openjdk-11'
            args '-v $HOME/.m2:/root/.m2'
        }
    }
    environment {
        ACR_NAME = 'myacr'
        ACR_URL = 'myacr.azurecr.io'
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        stage('Build Backend') {
            steps {
                dir('Backend') {
                    sh 'mvn clean package'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('Frontend') {
                    sh 'npm install && npm run build'
                }
            }
        }
        stage('Docker Build & Push') {
            steps {
                script {
                    sh "docker build -t $ACR_URL/backend:latest Backend/"
                    sh "docker build -t $ACR_URL/frontend:latest Frontend/"
                    sh "docker login $ACR_URL -u <your-username> -p <your-password>"
                    sh "docker push $ACR_URL/backend:latest"
                    sh "docker push $ACR_URL/frontend:latest"
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}
