namespace NodeJS {
    interface ProcessEnv {
        PORT: string
        DB_URI: string
        SMTP_USER: string
        SMTP_PASS: string
        SMTP_HOST: string
        SMTP_PORT: string
        SMTP_SECURE: string
        TEST_EMAIL_FROM: string
    }
}