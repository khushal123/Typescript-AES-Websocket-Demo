import fp from 'fastify-plugin'
import { connect, connection } from 'mongoose'
const uri = process.env.CONNECTION_URI as string


export default fp(async (fastify, opts) => {
    console.log("mongoose-connected")
    await connect(uri)
    const { db } = connection

    //Todo for future use
    try {
        const collections = await db.listCollections().toArray()
        const findCollection = collections.find((collection) => {
            return collection.name === "user-series"
        })
        // await db.dropCollection("user-series")
        if (!findCollection) {
            db.createCollection("user-series", {
                timeseries: {
                    timeField: "timestamp",
                    granularity: "minutes"
                }
            })
        }

    } catch (error) {
        console.error(error)
    }
    fastify.decorate(
        "connection",
        db
    );
})
declare module 'fastify' {
    export interface FastifyInstance {
        db(): any
    }
}

