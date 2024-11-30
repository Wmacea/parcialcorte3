import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  private readonly logger = new Logger('UserService')

  constructor(
    @InjectRepository(User)
    private readonly UserRepository : Repository<User>
  ){}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = this.UserRepository.create(createUserDto);
      await this.UserRepository.save(user);
      return {user};
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: number) { 
      const user : User = await this.UserRepository.findOneBy({id});
      if(!user)
        throw new NotFoundException(`User with id '${id}' not found`);
      return user;
  }

  async getAssist(id: number) {
    const queryBuilder = this.UserRepository.createQueryBuilder('user');
    const users = await queryBuilder.where('user.id =:userId',{
      userId : id
    })
    .leftJoinAndSelect('user.eventAttendance', 'attendance')
    .leftJoinAndSelect('attendance.event', 'event')
    .getMany();
    if (!users || users.length === 0) {
      throw new NotFoundException(`User with id ${id} does not have attendance or does not exist`);
    }
    return users;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userUpdated = await this.UserRepository.preload({id, ...updateUserDto});
    if(!userUpdated) throw new NotFoundException();
    await this.UserRepository.save(userUpdated);
    return userUpdated;
  }

}
