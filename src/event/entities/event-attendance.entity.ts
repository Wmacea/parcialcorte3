import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";

@Entity("event_attendance")
export class EventAttendace {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.eventAttendance, { onDelete: "CASCADE" })
  @JoinColumn({ name: "event_id" })
  event: Event;

  @ManyToOne(() => User, (user) => user.eventAttendance, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}