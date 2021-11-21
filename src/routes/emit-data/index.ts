import { FastifyPluginAsync } from "fastify"
import { SocketStream } from "fastify-websocket";
import { handleMessage } from "../../socket/emit.user";

const emit: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/', { websocket: true }, async function (connection: SocketStream, request) {
        return handleMessage(connection);
    })
}

export default emit;
