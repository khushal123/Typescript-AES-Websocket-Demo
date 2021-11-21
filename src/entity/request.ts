import { RequestGenericInterface } from 'fastify'

export interface ListenQueryRequest extends RequestGenericInterface {
    Querystring: {
        count: number
    }
}