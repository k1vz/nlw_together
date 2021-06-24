import { EntityRepository, Repository } from 'typeorm'
import { Tag } from '../entities/Tags'

@EntityRepository(Tag)
export class TagRepositories extends Repository<Tag> {

}