import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { Repository } from 'typeorm'
import { UsersService } from 'src/users/users.service'
import { Pagination } from 'src/decorators/pagination-params.decorator'
import { PaginatedResource } from 'src/common/dto/paginated-resourse.dto'
import { omit } from 'lodash'

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>, private userService: UsersService) { }

  async create(createPostDto: CreatePostDto, username: string): Promise<Post> {
    const user = await this.userService.findOne(username)

    if (!user) {
      throw new NotFoundException('Пользователь не найден')
    }

    const post = this.postRepository.create({ ...createPostDto, user })
    const createdPost = await this.postRepository.save(post)

    delete createdPost.user

    return createdPost
  }

  async findUserPosts(pagination: Pagination, username: string): Promise<PaginatedResource<Post>> {
    const [posts, total] = await this.postRepository.findAndCount({
      take: pagination.limit,
      skip: pagination.offset,
      where: {
        user: { username }
      }
    })

    return {
      total: total,
      items: posts,
      size: pagination.size,
      page: pagination.page
    }
  }

  findOne(slug: string): Promise<Post> {
    return this.postRepository.findOne({ where: { slug } })
  }

  async update(userId: number, slug: string, updatePostDto: UpdatePostDto): Promise<Post> {

    const post = await this.postRepository.findOne({ where: { slug }, relations: ['user'] })

    if (!userId || post.user.id !== userId) {
      throw new ForbiddenException('У вас нет прав на выполнение этой операции')
    }

    await this.postRepository.update({ slug }, updatePostDto)
    const updatedPost = await this.findOne(slug)

    return updatedPost
  }

  async remove(slug: string, userId: number): Promise<Omit<Post, 'user'>> {
    const post = await this.postRepository.findOne({ where: { slug }, relations: ['user'] })

    if (!post) {
      throw new NotFoundException('Пост не найден')
    }

    if (post.user.id !== userId) {
      throw new ForbiddenException('У вас нет прав на выполнение этой операции')
    }

    const removedPost = await this.postRepository.remove(post)

    return omit(removedPost, ['user'])
  }
}
