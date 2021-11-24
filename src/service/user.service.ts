import { TimeSeriesAggregatedUsers, TimeStampUser } from '../entity/user';
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

    async getUsers(count: number): Promise<Array<TimeSeriesAggregatedUsers>> {
        try {
            const users: Array<TimeSeriesAggregatedUsers> = await UserSeriesModel.aggregate([
                { $sort: { "timestamp": -1 } },
                { $limit: Number(count) },
                {
                    $project: {
                        date: {
                            $dateToParts: { date: "$timestamp" }
                        },
                        name: 1,
                        destination: 1,
                        origin: 1,
                        timestamp: 1
                    }
                },
                {
                    $group: {
                        _id: {
                            minute: "$date.minute"
                        },
                        date: { $first: "$date" },
                        users: {
                            $push: {
                                "name": "$name",
                                "origin": "$origin",
                                "destination": "$destination",
                                timestamp: "$timestamp"
                            }
                        }
                    }
                },
                {
                    $project: {
                        minute: 1,
                        date: 1,
                        users: 1
                    }
                }
            ]).exec();
            return users;
        } catch (error) {
            throw error
        }
    }

}