pipeline {

    agent any

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
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Login to AWS ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials'
                ]]) {
                    sh '''
                        aws ecr get-login-password --region eu-north-1 | \
                        docker login --username AWS --password-stdin 102783063324.dkr.ecr.eu-north-1.amazonaws.com
                    '''
                }
            }
        }

        stage('Run Inside Docker') {
            steps {
                script {
                    docker.image('102783063324.dkr.ecr.eu-north-1.amazonaws.com/playwright-framework:latest')
                          .inside('-u root --ipc=host --entrypoint=""') {

                        sh '''
                            npm ci
                            npx playwright install --with-deps
                            npx playwright test
                        '''
                    }
                }
            }
        }

        stage('Upload Allure Report to S3') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials'
                ]]) {
                    sh '''
                        aws s3 sync allure-report/ s3://${S3_BUCKET}/${BUILD_FOLDER}/ --delete
                    '''
                }
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