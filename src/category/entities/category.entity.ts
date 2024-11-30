import { EventCategory } from "src/event/entities/event-category.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'categories'})
export class Category {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('varchar',{
        unique : true
    })
    name : string;

    @Column('varchar')
    description : string;

    @OneToMany(
        () => EventCategory,
        (eventCategory) => eventCategory.category,
    )
    eventCategories : EventCategory[];
}
