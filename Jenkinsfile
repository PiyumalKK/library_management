pipeline {
    agent {
        docker {
            image 'maven:3.8.1-openjdk-11'
            args '-v $HOME/.m2:/root/.m2'
        }
    }
    stages {
        stage('Build Backend') {
            steps {
                dir('Backend') {
                    sh 'echo "Building backend..."'
                    // Add your non-Docker build commands here
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('Frontend') {
                    sh 'echo "Building frontend..."'
                    // Add your non-Docker build commands here
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'echo "Deploying application..."'
                // Add your deployment commands here
            }
        }
    }
}