import fp from 'fastify-plugin'
import { connect, connection } from 'mongoose'
const uri = process.env.CONNECTION_URI as string


export default fp(async (fastify, opts) => {
    console.log("mongoose-connected")
    await connect(uri)
    const { db } = connection

    //create timeseries collection before saving data
    db.createCollection("user-series", {
        timeseries: {
            timeField: "timestamp",
            granularity: "minutes"
        }
    })
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

