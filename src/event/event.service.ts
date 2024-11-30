import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Event } from './entities/event.entity';
import { Category } from 'src/category/entities/category.entity';
import { EventCategory } from './entities/event-category.entity';
import { CategoryService } from 'src/category/category.service';
import { User } from 'src/user/entities/user.entity';
import { EventAttendace } from './entities/event-attendance.entity';

@Injectable()
export class EventService {

  constructor(
    @InjectRepository(Event)
    private readonly EventRepository : Repository<Event>,

    @InjectRepository(EventCategory)
    private readonly EventCategoryRepository : Repository<EventCategory>,

    @InjectRepository(EventAttendace)
    private readonly EventAttendaceRepository : Repository<EventAttendace>,

    private readonly userService : UserService,

    private readonly categoryService : CategoryService,

    private readonly dataSource : DataSource
  ){}

  async create(createEventDto: CreateEventDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    const { organizer_id, categoryId, ...eventData } = createEventDto;  
    const userOrganizer = await this.userService.findOne(organizer_id);
    try {
      if (!userOrganizer) throw new Error(`Organizer with ID ${organizer_id} not found.`);
      const event = this.EventRepository.create({
        ...eventData,
        organizer_id: userOrganizer,
      });
      if (!categoryId) {
        await this.EventRepository.save(event);
        return {
          ...event,
          organizer: userOrganizer.id,
        };
      }  
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const category = await this.categoryService.findOne(categoryId);
      if (!category) throw new Error(`Category with ID ${categoryId} not found.`);
      await queryRunner.manager.save(event);
      const eventCategory = this.EventCategoryRepository.create({ category, event });
      await queryRunner.manager.save(eventCategory);
      await queryRunner.commitTransaction();
      return {
        ...event,
        organizer: userOrganizer.id,
        category: category.id,
      };
    } catch (error) {
      console.error("Error creating event:", error);
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(id: number) {
    const queryBuilder = this.EventRepository.createQueryBuilder('event');
    const event = await queryBuilder.where('event.id =:eventId',{
      eventId : id
    })
    .leftJoinAndSelect('event.organizer_id', 'userOrganizer')
    .getOne();
    if(!event)
      throw new NotFoundException(`Event with id ${id} not found`)
    return event;
  }

  async getComments(id : number){
    const queryBuilder = this.EventRepository.createQueryBuilder('event');
    const events = await queryBuilder.where('event.id =:eventId',{
      eventId : id
    }).leftJoinAndSelect('event.comments', 'comments').getMany();
    return events;
  }

  async getDetails(id : number){
    const queryBuilder = this.EventRepository.createQueryBuilder('event');
    const events = await queryBuilder.where('event.id =:eventId',{
      eventId : id
    }).leftJoinAndSelect('event.eventCategories', 'categories')
    .leftJoinAndSelect('categories.category', 'category')
    .leftJoinAndSelect('event.eventAttendance', 'attendance')
    .leftJoinAndSelect('attendance.user', 'user')
    .getOne();
    return events;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
      const {organizer_id} = updateEventDto;
      const userOrganizer = await this.userService.findOne(organizer_id);
      const dataEvent = {
        ...updateEventDto,
        organizer_id : userOrganizer
      }
      const eventUpdated = await this.EventRepository.preload({id, ...dataEvent});
      if(!eventUpdated) throw new NotFoundException(`Event with id ${id} not found`)
      await this.EventRepository.save(eventUpdated);
      return eventUpdated;
  }

  async userAttendance(idUser : number, idEvent : number){
    const user : User = await this.userService.findOne(idUser);
    const event : Event = await this.findOne(idEvent);
    const userA = await this.EventAttendaceRepository.findOneBy({user , event});
    if(userA) throw new BadRequestException('user already register in this event');
    const eventAttendace = this.EventAttendaceRepository.create({
      user,
      event
    });
    return await this.EventAttendaceRepository.save(eventAttendace);
  }

}
