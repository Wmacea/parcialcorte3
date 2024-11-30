import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { EventService } from 'src/event/event.service';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private readonly CommentRepository : Repository<Comment>,

    private readonly userService : UserService,

    private readonly eventService : EventService

  ){}

  async create(createCommentDto: CreateCommentDto, userId : number, eventId : number) {
    const ownerComment = await this.userService.findOne(userId);
    const eventComment = await this.eventService.findOne(eventId);
    try {
      const comment : Comment = this.CommentRepository.create({
        ...createCommentDto,
        user : ownerComment,
        event : eventComment
      });
      await this.CommentRepository.save(comment);
      return comment;
    } catch (error) {
      throw new InternalServerErrorException(error.name)
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const commentUpdated = await this.CommentRepository.preload({id, ...updateCommentDto});
    if(!commentUpdated) throw new NotFoundException(`Comment with id ${id} not found`);
    await this.CommentRepository.save(commentUpdated);
    return commentUpdated;
  }

  async remove(id: number) {
    const comment = await this.CommentRepository.findOneBy({id});
    if(!comment) throw new NotFoundException(`Comment with id ${id} not found`);
    await this.CommentRepository.remove(comment);
    return comment;
  }
}
