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

    // 🔥 CRON TRIGGERS
    triggers {
        // Smoke: Monday–Friday at 10 AM IST
        cron('TZ=Asia/Kolkata\nH 10 * * 1-5')

        // Regression: Saturday at 12 PM IST
        cron('TZ=Asia/Kolkata\nH 12 * * 6')
    }

    parameters {
        choice(
            name: 'TEST_TYPE',
            choices: ['smoke', 'regression', 'all'],
            description: 'Select which test suite to run (Manual Trigger Only)'
        )
    }

    environment {
        S3_BUCKET = "rahul-playwright-reports-2026"
        BUILD_FOLDER = "build-${BUILD_NUMBER}"
        JAVA_HOME = "/usr/lib/jvm/java-17-openjdk-amd64"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Java') {
            steps {
                sh """
                    apt-get update
                    apt-get install -y openjdk-17-jdk
                    java -version
                """
            }
        }

        stage('Install & Run Tests') {
            steps {
                script {

                    def testCommand = ""
                    def day = sh(script: "date +%u", returnStdout: true).trim()
                    // 1=Mon ... 6=Sat ... 7=Sun

                    if (currentBuild.rawBuild.getCause(hudson.model.Cause$UserIdCause)) {
                        // Manual Run
                        echo "Manual run detected"
                        if (params.TEST_TYPE == "smoke") {
                            testCommand = "npx playwright test --grep @smoke"
                        } 
                        else if (params.TEST_TYPE == "regression") {
                            testCommand = "npx playwright test --grep @regression"
                        } 
                        else {
                            testCommand = "npx playwright test"
                        }
                    } else {
                        // Scheduled Run
                        if (day == "6") {
                            echo "Weekend detected → Running Regression Suite"
                            testCommand = "npx playwright test --grep @regression"
                        } else {
                            echo "Weekday detected → Running Smoke Suite"
                            testCommand = "npx playwright test --grep @smoke"
                        }
                    }

                    def exitCode = sh(
                        script: """
                            export JAVA_HOME=${JAVA_HOME}
                            export PATH=\$JAVA_HOME/bin:\$PATH
                            npm ci
                            ${testCommand}
                        """,
                        returnStatus: true
                    )

                    sh """
                        export JAVA_HOME=${JAVA_HOME}
                        export PATH=\$JAVA_HOME/bin:\$PATH
                        echo "Generating Allure report..."
                        npx allure generate allure-results --clean -o allure-report
                    """

                    if (exitCode != 0) {
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }

        stage('Upload Allure Report to S3') {
            steps {
                sh """
                    echo "Uploading Allure report..."
                    aws s3 sync allure-report/ s3://${S3_BUCKET}/${BUILD_FOLDER}/ --delete
                """
            }
        }
    }

    post {
        always {
            echo "=============================="
            echo "Allure report available at:"
            echo "https://${S3_BUCKET}.s3.eu-north-1.amazonaws.com/${BUILD_FOLDER}/index.html"
            echo "=============================="
        }
    }
}
