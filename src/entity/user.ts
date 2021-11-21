export interface User {
    name: string
    origin: string
    destination: string
}

export interface SecretUser extends User {
    secret_key: string
}

export interface TimeStampUser extends User {
    timestamp: Date
}

