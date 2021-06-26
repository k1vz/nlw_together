import { getCustomRepository } from 'typeorm'
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories'
import { UserRepositories } from '../repositories/UserRepositories'

interface IComplimentRequest {
	tag_id: string;
	user_sender: string;
	user_receiver: string;
	message: string;
}

export class CreateComplimentService {
	async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
		const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
		const usersRepositories = getCustomRepository(UserRepositories)

		if (user_sender === user_receiver) {
			throw new Error("User sender and user receiver are the same")
		}

		// ID já é o retorno padrão do 'findOne()'
		const userReceiverExists = await usersRepositories.findOne(user_receiver)

		if (!userReceiverExists) {
			throw new Error("User receiver doesn't exists")
		}

		const compliment = complimentsRepositories.create({
			tag_id,
			user_sender,
			user_receiver,
			message
		})

		await complimentsRepositories.save(compliment)

		return compliment
	}
}