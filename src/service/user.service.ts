import { TimeStampUser } from '../entity/user';
import UserSeriesModel from '../models/user-series'

export class UserService {

    constructor() {

    }

    async saveUsers(users: TimeStampUser[]): Promise<string> {
        try {
            await UserSeriesModel.insertMany(users)
            return "inserted";
        } catch (error) {
            throw error
        }
    }

    async getUsers(): Promise<any> {
        return [
            {
                "id": 1,
                "name": "khushl"
            }
        ]
    }

}