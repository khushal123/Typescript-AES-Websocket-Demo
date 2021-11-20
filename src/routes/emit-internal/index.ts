import { FastifyPluginAsync } from "fastify"
import { SocketStream } from "fastify-websocket";

const internal: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/', { websocket: true }, async function (connection: SocketStream, request) {
        return {
            test: "this is test"
        }
    })
}

export default internal;
