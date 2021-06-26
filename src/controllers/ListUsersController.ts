import { Request, Response } from 'express'
import { ListUsersService } from '../services/ListUsersService'
import { classToPlain } from 'class-transformer'

export class ListUsersController {
	 
	async handle(request: Request, response: Response) {
		const listUsersService = new ListUsersService()

		const users = await listUsersService.execute()

		return classToPlain(users)
	}
}