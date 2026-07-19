pipeline {
    agent any
    
    environment {
        ACR_REGISTRY = "registry-vpc.ap-southeast-5.aliyuncs.com"
        ACR_NAMESPACE = "gandes-test"
        IMAGE_NAME = "gandes-github"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        FULL_IMAGE_NAME = "${ACR_REGISTRY}/${ACR_NAMESPACE}/${IMAGE_NAME}:${IMAGE_TAG}"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                echo "🔨 Building image: ${FULL_IMAGE_NAME}"
                script {
                    docker.build("${FULL_IMAGE_NAME}")
                }
            }
        }

        stage('Push to Alibaba ACR') {
            steps {
                echo "📤 Pushing image to ACR..."
                script {
                    docker.withRegistry("https://${ACR_REGISTRY}", 'acr-creds') {
                        docker.image("${FULL_IMAGE_NAME}").push()
                        docker.image("${FULL_IMAGE_NAME}").push('latest')
                    }
                }
            }
        }

        stage('Deploy to Alibaba ACK') {
            steps {
                echo "🚀 Deploying to ACK..."
                withKubeConfig([credentialsId: 'ack-kubeconfig']) {
                    sh """
                        sed -i 's|image:.*|image: ${FULL_IMAGE_NAME}|g' k8s-deployment.yaml
                        cat k8s-deployment.yaml
                        kubectl apply -f k8s-deployment.yaml
                        kubectl rollout status deployment/my-app-deployment-from-jenkins --timeout=120s
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline Sukses! Aplikasi berhasil di-deploy ke ACK.'
        }
        failure {
            echo '❌ Pipeline Gagal! Cek console output untuk detail error.'
        }
    }
}
