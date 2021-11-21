import { User } from '../dao/user'
import { encryptAES256CTR } from './crypt'
function getUsers(num: number): string {
    try {
        const userDao: User = new User()
        const users = []
        while (num > 0) {
            const randomUser = userDao.getUser()
            const encryptedUser = encryptAES256CTR(JSON.stringify(randomUser));
            users.push(encryptedUser)
            num--;
        }
        return users.join("|")
    } catch (error) {
        throw error
    }
}

export default getUsers