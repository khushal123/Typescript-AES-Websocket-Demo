import { Schema, model, Document } from 'mongoose'

// export interface UserSeriesDocument extends Document {
//     date: Date,
//     users: User[]
// }
interface User extends Document {
    name: string,
    origin: string,
    destination: string,
    timestamp: Date
}

const schema = new Schema<User>({
    name: String,
    origin: String,
    destination: String,
    timestamp: Date
}, {
    timestamps: true
})

const UserSeriesModel = model<User>("UserSeries", schema, "user-series")

export default UserSeriesModel;