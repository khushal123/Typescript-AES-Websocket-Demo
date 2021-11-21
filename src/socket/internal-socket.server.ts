import { ErrorEvent, MessageEvent, WebSocket, WebSocketServer } from 'ws'
import getUsers from '../utils/functions';

let count: number = 2
let delay: number = 1
let receivedParams: boolean = false

let timeout: any = null


function emitUser(socket: WebSocket) {
    if (!receivedParams) {
        return
    }
    const interval: number = delay * 1000;
    timeout = setInterval(() => {
        socket.send(getUsers(count))
    }, interval)
}

async function onOpen() {
    console.log("server opOpen")
}

function onConnection(socket: WebSocket) {
    console.log("onconnection")
    socket.onmessage = onMessage
}

function onError(error: ErrorEvent) {
    console.log(`error is ${error}`)
}
function onClose() {
    if (!timeout) {
        clearInterval(timeout)
    }
}


function onMessage(message: MessageEvent) {
    console.log("onMessage")
    const data = JSON.parse(message.data.toString())
    console.log(data.type && data.type === "params")
    if (data.type && data.type === "params") {
        count = Number(data.count)
        delay = Number(data.delay)
        receivedParams = true
        emitUser(message.target)
    }
}


export function InternalSocketServer() {
    const ws: WebSocketServer = new WebSocketServer({
        port: 3001,
        path: "/internal",
        host: "localhost",
    });
    ws.addListener("open", onOpen)
    ws.addListener("connection", onConnection)
    ws.addListener("error", onError)
    ws.addListener("close", onClose)
}