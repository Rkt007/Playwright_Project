pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.58.0-jammy'
            args '-u root --ipc=host'
        }
    }

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

        stage('Install & Run Tests') {
            steps {
                script {
                    def testCommand = ""

                    if (params.TEST_TYPE == "smoke") {
                        testCommand = "npx playwright test --grep @smoke"
                    } 
                    else if (params.TEST_TYPE == "regression") {
                        testCommand = "npx playwright test --grep @regression"
                    } 
                    else {
                        testCommand = "npx playwright test"
                    }

                    // Capture exit code manually
                    def exitCode = sh(
                        script: """
                            npm ci
                            npm install -g allure-commandline
                            ${testCommand}
                        """,
                        returnStatus: true
                    )

                    // Always generate Allure report
                    sh "npx allure generate allure-results --clean -o allure-report"

                    // Mark build as failed if tests failed
                    if (exitCode != 0) {
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }

        stage('Upload Allure Report to S3') {
            steps {
                sh """
                    aws s3 sync allure-report/ \
                    s3://${S3_BUCKET}/${BUILD_FOLDER}/ \
                    --delete
                """
            }
        }
    }

    post {
        always {
            echo "Allure report available at:"
            echo "https://${S3_BUCKET}.s3.eu-north-1.amazonaws.com/${BUILD_FOLDER}/index.html"
        }
    }
}
