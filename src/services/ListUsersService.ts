import { getCustomRepository } from 'typeorm'
import { UserRepositories } from '../repositories/UserRepositories'

export class ListUsersService {
	async execute() {
		const userRepositories = getCustomRepository(UserRepositories)

		let users = await userRepositories.find()
    	
		return users
	}
}