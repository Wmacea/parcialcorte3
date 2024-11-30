import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UserModule } from 'src/user/user.module';
import { EventModule } from 'src/event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    UserModule,
    EventModule,
    TypeOrmModule.forFeature([Comment])
  ],
  exports: [
    TypeOrmModule
  ]
})
export class CommentModule {}
