import { FastifyPluginAsync } from "fastify"
import { InternalSocketClient } from '../../socket/internal-socket.client'

const listen: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/', async function (request, reply) {
        new InternalSocketClient()
        return reply.view("listen.ejs", { text: "connected ws" })
    })
}

export default listen;
