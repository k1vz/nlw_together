import { getCustomRepository } from 'typeorm'
import { UserRepositories } from '../repositories/UserRepositories'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'

interface IAuthenticateRequest {
	email: string,
	password: string
}

export class AuthenticateUserService {
	async execute({email, password}: IAuthenticateRequest) {
		const usersRepository = getCustomRepository(UserRepositories)

		const user = await usersRepository.findOne({
			email
		})

		if (!user) {
			throw new Error("Email don't exist")
		}

		const passwordMatch = await compare(password, user.password)

		if (!passwordMatch) {
			throw new Error("Password don't match")
		}

		const token = sign({
			email: user.email
		}, "8abdcb9ed898f3254b6cfb2ec680e087", {
			subject: user.id,
			expiresIn: "1d"
		})

		return token
	}
}