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

export interface DateParts {
    year: string,
    month: string,
    day: string,
    hour: string,
    minute: string,
    second: string,
    millisecond: string
}
export interface TimeSeriesAggregatedUsers {
    minute: number,
    date: DateParts,
    users: Array<User>
}

