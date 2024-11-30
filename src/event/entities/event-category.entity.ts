import { Category } from "src/category/entities/category.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";

@Entity("event_category")
export class EventCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.eventCategories, { onDelete: "CASCADE" })
  @JoinColumn({ name: "event_id" })
  event: Event;

  @ManyToOne(() => Category, (category) => category.eventCategories, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category: Category;
}