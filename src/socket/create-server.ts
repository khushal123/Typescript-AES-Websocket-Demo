import { InternalSocketServer } from './internal-socket.server'
import { User } from '../dao/user'

new InternalSocketServer(new User())