export default interface User {
    name: string
    origin: string
    destination: string
}

export interface SecretUser extends User{
    secret_key: string
}