import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Get(':id/comment')
  getComments(@Param('id') id: string) {
    return this.eventService.getComments(+id);
  }

  @Get(':id/details')
  getDetails(@Param('id') id: string) {
    return this.eventService.getDetails(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Post(':userId/:eventId')
  userAttendance(
    @Param('userId') userId : string,
    @Param('eventId') eventId : string
  ){
    return this.eventService.userAttendance(+userId, +eventId);
  }

}
