pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.40.0-jammy'
            args '--user root'
        }
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}
