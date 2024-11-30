import { Comment } from "src/comment/entities/comment.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventCategory } from "./event-category.entity";
import { EventAttendace } from "./event-attendance.entity";

@Entity({ name : 'events' })
export class Event {
    @PrimaryGeneratedColumn()
    id              : number;

    @Column('varchar',{
        unique : true
    })
    title           : string;

    @Column('text')
    description     : string;

    @Column('datetime',{
        default : () => 'CURRENT_TIMESTAMP'
    })
    date            : Date;

    @Column('varchar')
    location        : string;

    @OneToOne(() => User)
    @JoinColumn()
    organizer_id    : User;

    @OneToMany(
        () => Comment,
        (comment) => comment.event,
        {cascade : true}
    )
    comments : Comment[];

    @OneToMany(
        () => EventCategory,
        (eventCategory) => eventCategory.event,
    )
    eventCategories : EventCategory[];

    @OneToMany(
        () => EventAttendace,
        (eventAttendance) => eventAttendance.event,
      )
      eventAttendance : EventAttendace[];
    

    @Column('datetime',{
        default : () => 'CURRENT_TIMESTAMP'
    })
    create_at       : Date;

}
