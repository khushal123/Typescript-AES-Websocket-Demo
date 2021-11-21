import { SocketStream } from 'fastify-websocket'
// import { UserService } from '../service/user.service'

let _conn: SocketStream;

export async function sendToClient(message: string) {
  if (_conn) {
    _conn.socket.send(message)
  }
}

export async function handleMessage(connection: SocketStream) {
  if (!_conn) {
    _conn = connection
  }
}
