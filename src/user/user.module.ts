import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, Comment])
  ],
  exports: [
    UserService,
    TypeOrmModule
  ]
})
export class UserModule {}
