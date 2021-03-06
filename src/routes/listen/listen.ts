import { FastifyPluginAsync } from "fastify"
import { ListenQueryRequest } from "../../entity/request"
import { InternalSocketClient } from '../../socket/internal-socket.client'

const listen: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get<ListenQueryRequest>('/', async (request, reply) => {
        const { count, delay } = request.query
        new InternalSocketClient(delay, count)
        return reply.view("listen.ejs", { text: "connected ws" })
    })
}

export default listen;
