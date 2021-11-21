import { User as UserEntity, SecretUser } from '../entity/user';
import { names, cities } from './mock/data.json'
import { genHashSHA256 } from '../utils/crypt'

export class User {

    namesLength: number = names.length
    citiesLength: number = cities.length

    private randomNumber(minimum: number, maximum: number) {
        return Math.round(Math.random() * (maximum - minimum) + minimum);
    }

    private getRandomUserName(): string {
        return names[this.randomNumber(0, this.namesLength - 1)]
    }

    private getRandomCity(): string {
        return cities[this.randomNumber(0, this.citiesLength - 1)]
    }

    getUser(): SecretUser {
        const user: UserEntity = {
            name: this.getRandomUserName(),
            origin: this.getRandomCity(),
            destination: this.getRandomCity()
        }
        const hash = genHashSHA256(JSON.stringify(user))
        const secretUser: SecretUser = {
            ...user,
            secret_key: hash
        }
        return secretUser;
    }
    
    async saveUsers(users: User[]) {

    }
}
