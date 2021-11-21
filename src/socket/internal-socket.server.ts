import { ErrorEvent, MessageEvent, WebSocket, WebSocketServer } from 'ws'
import getUsers from '../utils/functions'


export class InternalSocketServer {
    public ws: WebSocketServer;
    timeout: any
    count: number = 2
    constructor() {
        this.ws = new WebSocketServer({
            port: 3001,
            path: "/internal",
            host: "localhost",
        })
        this.ws.addListener("open", this.onOpen.bind(this))
        this.ws.addListener("connection", this.onConnection.bind(this))
        this.ws.addListener("error", this.onError.bind(this))
        this.ws.addListener("close", this.onClose.bind(this))
    }


    private emitUser(socket: WebSocket) {
        const interval: number = 1 * 1000;
        this.timeout = setInterval(() => {
            socket.send(getUsers(this.count))
        }, interval)
    }

    private async onOpen() {
        console.log("server open")
    }

    private async onConnection(socket: WebSocket) {
        socket.onmessage = this.onMessage
        console.log("onconnection")
        this.emitUser(socket)
    }

    private onError(error: ErrorEvent) {
        console.log(`error is ${error}`)
    }
    private onClose() {
        clearInterval(this.timeout)
    }

    private onMessage(message: MessageEvent) {
        const data = JSON.parse(message.data.toString())
        if (data.count) {
            this.count = data.count
        }
        console.log("this is serve %s", message.data.toString())

    }

}