import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Event } from './entities/event.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { EventCategory } from './entities/event-category.entity';
import { CategoryModule } from 'src/category/category.module';
import { EventAttendace } from './entities/event-attendance.entity';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [
    UserModule,
    CategoryModule,
    TypeOrmModule.forFeature([Event, Comment, EventCategory, EventAttendace])
  ],
  exports: [
    EventService,
    TypeOrmModule
  ]
})
export class EventModule {}
