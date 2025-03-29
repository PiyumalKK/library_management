pipeline {
    agent any
    stages {
        stage('Build Backend') {
            steps {
                dir('Backend') {
                    sh 'docker build -t myapp-backend:latest .'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('Frontend') {
                    sh 'docker build -t myapp-frontend:latest .'
                }
            }
        }
        stage('Deploy Locally') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }
}