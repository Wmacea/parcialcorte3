import { Event } from "src/event/entities/event.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'comments'})
export class Comment {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('varchar')
    content : string;

    @ManyToOne(
        () => User, 
        (user) => user.id,
        {onDelete : 'CASCADE'}
    )
    user : User;

    @ManyToOne(
        () => Event,
        (event) => event.id,
        {onDelete : 'CASCADE'}
    )
    event : Event;

    @Column('datetime',{
        default : () => 'CURRENT_TIMESTAMP'
    })
    create_at : Date;
}
