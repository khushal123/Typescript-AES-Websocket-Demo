import { WebSocket } from 'ws'


export class InternalSocketClient {
    public ws: WebSocket;
    constructor() {
        this.ws = new WebSocket("ws://localhost:3001/internal", {
            protocol:"websocket"
        })
        this.ws.addListener("error", this.onError.bind(this))
        this.ws.addListener("message", this.onMessage.bind(this))
        this.ws.addListener("open", this.onError.bind(this))
    }

    onError(error:any) {
        console.error(`error in client ${error}`)
    }

    onOpen(){
        console.log("connection open from client")
    }
    
    onMessage(message: string) {
        console.log('from server %s', message)
    }

}