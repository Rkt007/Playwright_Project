pipeline {
    agent any

    options {
        timestamps()
    }

    parameters {
        choice(
            name: 'TEST_TYPE',
            choices: ['smoke', 'regression', 'all'],
            description: 'Select which test suite to run'
        )
    }

    environment {
        S3_BUCKET = "rahul-playwright-reports-2026"
        BUILD_FOLDER = "build-${BUILD_NUMBER}"
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
                    def testCommand = ""

                    if (params.TEST_TYPE == "smoke") {
                        testCommand = "npx playwright test --grep @smoke --reporter=html,junit"
                    } 
                    else if (params.TEST_TYPE == "regression") {
                        testCommand = "npx playwright test --grep @regression --reporter=html,junit"
                    } 
                    else {
                        testCommand = "npx playwright test --reporter=html,junit"
                    }

                    sh """
                    docker run --rm \
                      -v \$WORKSPACE:/app \
                      -w /app \
                      mcr.microsoft.com/playwright:v1.40.0-jammy \
                      bash -c "
                        npm ci &&
                        npx playwright install --with-deps &&
                        ${testCommand}
                      "
                    """
                }
            }
        }

        stage('Upload Report to S3') {
            steps {
                sh """
                aws s3 sync playwright-report/ \
                s3://${S3_BUCKET}/${BUILD_FOLDER}/ \
                --delete
                """
            }
        }
    }

    post {

        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            junit allowEmptyResults: true, testResults: 'test-results/*.xml'
        }

        success {
            echo "✅ Tests Passed Successfully!"
            echo "Report URL:"
            echo "https://${S3_BUCKET}.s3.amazonaws.com/${BUILD_FOLDER}/index.html"
        }

        failure {
            echo "❌ Tests Failed!"
            echo "Failure Report URL:"
            echo "https://${S3_BUCKET}.s3.amazonaws.com/${BUILD_FOLDER}/index.html"
        }
    }
}
