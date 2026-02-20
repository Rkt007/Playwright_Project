pipeline {

    agent {
        docker {
            image '102783063324.dkr.ecr.eu-north-1.amazonaws.com/playwright-framework:latest'
            args '-u root --ipc=host'
        }
    }

    options {
        timestamps()
    }

    triggers {
        cron('''
            H 10 * * 1-5
            H 12 * * 6
        ''')
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

        AWS_DEFAULT_REGION = "eu-north-1"
        AWS_REGION = "eu-north-1"

        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
    steps {
        sh '''
            export DEBIAN_FRONTEND=noninteractive

            apt-get update
            apt-get install -y openjdk-17-jdk awscli tzdata

            # Set timezone to Asia/Kolkata
            ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime
            dpkg-reconfigure --frontend noninteractive tzdata

            java -version
            aws --version
        '''
    }
}


        stage('Install & Run Tests') {
            steps {
                script {

                    def testCommand = ""

                    if (env.BUILD_CAUSE_TIMERTRIGGER) {

                        echo "Scheduled run detected"

                        def day = sh(script: "date +%u", returnStdout: true).trim()

                        if (day == "6") {
                            echo "Weekend → Running Regression Suite"
                            testCommand = "npx playwright test --grep @regression"
                        } else {
                            echo "Weekday → Running Smoke Suite"
                            testCommand = "npx playwright test --grep @smoke"
                        }

                    } else {

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
                    }

                    def exitCode = sh(
                        script: """
                            export JAVA_HOME=${JAVA_HOME}
                            export PATH=\$JAVA_HOME/bin:\$PATH
                            npm ci
                            npx playwright install --with-deps
                            ${testCommand}
                        """,
                        returnStatus: true
                    )

                    sh """
                        echo "Generating Allure report..."
                        npx allure generate allure-results --clean -o allure-report || true
                    """

                    if (exitCode != 0) {
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }

        stage('Upload Allure Report to S3') {
            steps {
                sh '''
                    echo "Uploading Allure report to S3..."
                    aws s3 sync allure-report/ s3://${S3_BUCKET}/${BUILD_FOLDER}/ --delete
                '''
            }
        }
    }

    post {
        always {
            echo "=============================="
            echo "Allure report available at:"
            echo "https://${env.S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${env.BUILD_FOLDER}/index.html"
            echo "=============================="
        }
    }
}
