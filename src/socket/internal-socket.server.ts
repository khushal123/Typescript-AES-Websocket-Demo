import { ErrorEvent, WebSocketServer } from 'ws'
import { User } from '../dao/user'


export class InternalSocketServer {
    public ws: WebSocketServer;
    user: User
    timeout: any
    constructor(user: User) {
        this.user = user
        this.ws = new WebSocketServer({
            port: 3001,
            path:"/internal",
            host:"localhost",
        })
        console.log(this.ws.path)
        console.log(this.ws.options)
        this.ws.addListener("open", this.onOpen.bind(this))
        this.ws.addListener("connection", this.onConnection.bind(this))
        this.ws.addListener("error", this.onError.bind(this))
        this.ws.addListener("close", this.onClose.bind(this))
        this.ws.addListener("message", this.onMessage.bind(this))
    }


    private emitUser() {
        const interval: number = 10;
        this.timeout = setInterval(() => {
            this.ws.emit("message", JSON.stringify(this.user.getUser()))
        }, interval)
    }

    private async onOpen() {
        console.log("server open")
    }

    private async onConnection() {
        console.log("connected")
        this.emitUser()
    }

    private onError(error: ErrorEvent) {
        console.log(`error is ${error}`)
    }
    private onClose() {
        clearInterval(this.timeout)
    }

    private onMessage(message: string) {
        console.log("from client %s", message)
    }

}