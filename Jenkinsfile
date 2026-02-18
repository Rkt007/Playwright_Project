pipeline {

    agent any

    environment {
        CI = 'true'
    }

    options {
        timestamps()
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Run Playwright Tests in Docker') {
            steps {
                script {
                    docker.image('mcr.microsoft.com/playwright:v1.40.0-jammy')
                          .inside('--user root') {

                        sh 'npm ci'
                        sh 'npx playwright install --with-deps'
                        sh 'npx playwright test --reporter=html'
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }

        success {
            echo '✅ Tests Passed Successfully!'
        }

        failure {
            echo '❌ Tests Failed!'
        }
    }
}
