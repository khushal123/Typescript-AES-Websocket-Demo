import { ErrorEvent, MessageEvent, WebSocket } from 'ws'
import { SecretUser, TimeStampUser } from '../entity/user';
import { compareHash, decryptAES256CTR } from '../utils/crypt'
import { UserService } from '../service/user.service'
import { sendToClient } from './emit.user'

export class InternalSocketClient {
    public ws: WebSocket;

    userService: UserService
    currentDateTime: Date
    count: number = 2
    delay: number = 1
    constructor(delay: number, count: number) {
        this.ws = new WebSocket("ws://localhost:3001/internal", {
            protocol: "websocket"
        })

        this.userService = new UserService()
        this.count = count
        this.ws.addListener("open", this.onOpen.bind(this))
        this.currentDateTime = new Date()
        this.ws.onerror = this.onError.bind(this)
        this.ws.onmessage = this.onMessage.bind(this)
        this.delay = delay

    }

    onError(error: ErrorEvent) {
        console.error(`error in client ${JSON.stringify(error)}`)
    }

    onOpen() {
        console.log("connection to server is open")
        this.ws.send(JSON.stringify({
            type: "params",
            count: this.count,
            "delay": this.delay
        }))
    }

    async onMessage(message: MessageEvent) {
        console.log("received batch")
        try {
            const receivedDateTime = new Date();
            // const currentDateHour = this.currentDateTime.getHours();
            // const currentDateMinutes = this.currentDateTime.getMinutes();
            // const [receivedHour, receivedMinutes] = [receivedDateTime.getHours(), receivedDateTime.getMinutes()]

            const encryptedUsers = message.data.toString().split("|")
            const users: TimeStampUser[] = []
            for (let i in encryptedUsers) {
                const decrypt = decryptAES256CTR(encryptedUsers[i])
                if (!decrypt) {
                    continue
                }
                const secretUser: SecretUser = JSON.parse(JSON.parse(decrypt))
                const isHashSame = compareHash(secretUser)
                if (isHashSame) {
                    const user: TimeStampUser = {
                        name: secretUser.name,
                        destination: secretUser.destination,
                        origin: secretUser.origin,
                        timestamp: receivedDateTime
                    }
                    users.push(user)
                }
            }
            await this.userService.saveUsers(users)
            sendToClient(this.count, this.userService)
        } catch (error) {
            console.error(error, "unable to decipher users")
        }
    }

}