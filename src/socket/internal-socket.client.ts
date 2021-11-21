import { ErrorEvent, MessageEvent, WebSocket } from 'ws'
import { User, SecretUser } from '../entity/user';
import { compareHash, decryptAES256CTR } from '../utils/crypt'

export class InternalSocketClient {
    public ws: WebSocket;
    count: number
    constructor(count: number) {
        this.ws = new WebSocket("ws://localhost:3001/internal", {
            protocol: "websocket"
        })
        this.count = count
        this.ws.addListener("open", this.onOpen.bind(this))

        this.ws.onerror = this.onError.bind(this)
        this.ws.onmessage = this.onMessage.bind(this)


    }

    onError(error: ErrorEvent) {
        console.error(`error in client ${JSON.stringify(error)}`)
    }

    onOpen() {
        this.ws.send(JSON.stringify({ count: this.count }))
    }

    onMessage(message: MessageEvent) {
        console.log("received batch")
        try {
            const encryptedUsers = message.data.toString().split("|")
            const users: User[] = []
            for (let i in encryptedUsers) {
                const decrypt = decryptAES256CTR(encryptedUsers[i])
                if (!decrypt) {
                    continue
                }
                const secretUser: SecretUser = JSON.parse(JSON.parse(decrypt))
                const isHashSame = compareHash(secretUser)
                if (isHashSame) {
                    const user: User = {
                        name: secretUser.name,
                        destination: secretUser.destination,
                        origin: secretUser.origin
                    }
                    users.push(user)
                }
            }
        } catch (error) {
            console.error(error, "unable to decipher users")
        }
    }

}