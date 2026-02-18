pipeline {
    agent any

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
                sh '''
                docker run --rm \
                  -v $WORKSPACE:/app \
                  -w /app \
                  mcr.microsoft.com/playwright:v1.40.0-jammy \
                  bash -c "
                    npm ci &&
                    npx playwright install --with-deps &&
                    npx playwright test --reporter=html,junit
                  "
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            junit allowEmptyResults: true, testResults: 'test-results/*.xml'
        }

        success {
            echo '✅ Tests Passed Successfully!'
        }

        failure {
            echo '❌ Tests Failed!'
        }
    }
}
