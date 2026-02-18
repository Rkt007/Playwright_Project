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

        stage('Upload Report to S3') {
            steps {
                sh '''
                aws s3 sync playwright-report/ \
                s3://rahul-playwright-reports-2026/build-$BUILD_NUMBER/ \
                --delete
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
