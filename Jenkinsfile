pipeline {
    agent any

    environment {
        DOCKERHUB_CRED = credentials('dockerhub')  
        IMAGE_NAME = "mujju752/netflix-app"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/muzzammil-hamdu/netflix.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                    docker build -t ${IMAGE_NAME}:latest .
                    """
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    sh """
                    echo "${DOCKERHUB_CRED_PSW}" | docker login -u "${DOCKERHUB_CRED_USR}" --password-stdin
                    """
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    sh """
                    docker push ${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    sh """
                    docker rm -f netflix-app || true
                    docker run -d --name netflix-app -p 8080:80 ${IMAGE_NAME}:latest
                    """
                }
            }
        }
    }
}
