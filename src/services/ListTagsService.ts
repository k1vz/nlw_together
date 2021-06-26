import { getCustomRepository } from 'typeorm'
import { TagRepositories } from '../repositories/TagRepositories'
import { classToPlain } from 'class-transformer'

export class ListTagsService {
	async execute() {
		const tagRepositories = getCustomRepository(TagRepositories)

		let tags = await tagRepositories.find()
    	
		return classToPlain(tags)
	}
}