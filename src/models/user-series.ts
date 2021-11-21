import { Schema, model } from 'mongoose'

interface UserSeries {
    date: string,
    minute: number,
    users: User[]
}
interface User {
    name: string,
    origin: string,
    destination: string,
    timestamp: Date
}

const schema = new Schema<UserSeries>({
    date: String,
    minute: {
        type: Number,
    },
    users: Array
}, {
    timestamps: true
})

export default model<UserSeries>("UserSeries", schema, "user-series")