import { Comment } from "src/comment/entities/comment.entity";
import { EventAttendace } from "src/event/entities/event-attendance.entity";
import { EventCategory } from "src/event/entities/event-category.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'users'  })
export class User {
  @PrimaryGeneratedColumn()
  id : number;

  @Column('varchar')
  name : string;

  @Column('varchar', {
    unique : true
  })
  email : string;

  @OneToMany(
    () => Comment,
    (comment) => comment.user,
    {cascade : true}
  )
  comments : Comment[];

  @OneToMany(
    () => EventAttendace,
    (eventAttendance) => eventAttendance.user,
  )
  eventAttendance : EventAttendace[];

  @Column('datetime',{
    default : () => 'CURRENT_TIMESTAMP'
  })
  create_at : Date;
}
