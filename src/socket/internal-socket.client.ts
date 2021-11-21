import { ErrorEvent, MessageEvent, WebSocket } from 'ws'
import User, { SecretUser } from '../entity/user';
import { compareHash, decryptAES256CTR } from '../utils/crypt'

export class InternalSocketClient {
    public ws: WebSocket;
    constructor() {
        this.ws = new WebSocket("ws://localhost:3001/internal", {
            protocol: "websocket"
        })
        this.ws.addListener("open", this.onOpen.bind(this))

        this.ws.onerror = this.onError.bind(this)
        this.ws.onmessage = this.onMessage.bind(this)


    }

    onError(error: ErrorEvent) {
        console.error(`error in client ${JSON.stringify(error)}`)
    }

    onOpen() {
        this.ws.send("hii server from client")
    }

    onMessage(message: MessageEvent) {
        try {
            const encryptedUsers = message.data.toString().split("|")
            const users: User[] = []
            for (let i in encryptedUsers) {
                const decrypt = decryptAES256CTR(encryptedUsers[i])
                const secretUser: SecretUser = JSON.parse(decrypt)
                const isHashSame = compareHash(secretUser)
                console.log(isHashSame)
            }
            console.log(users)
        } catch (error) {
            console.error(error, "unable to decipher users")
        }
    }

}