import { SocketStream } from 'fastify-websocket'
import { TimeSeriesAggregatedUsers } from '../entity/user';
import { UserService } from '../service/user.service'
let _conn: SocketStream;

export async function sendToClient(count: number, userService: UserService) {
  if (_conn) {
    const users: Array<TimeSeriesAggregatedUsers> = await userService.getUsers(count)
    _conn.socket.send(JSON.stringify(users))
  }
}

export async function handleMessage(connection: SocketStream) {
  if (!_conn) {
    _conn = connection
  }
}
