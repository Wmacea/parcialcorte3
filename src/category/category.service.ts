import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly CategoryRepository : Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.CategoryRepository.create(createCategoryDto);
    await this.CategoryRepository.save(category); 
    return category;
  }

  async findAll() {
    const categories = await this.CategoryRepository.find({});
    if(!categories) throw new NotFoundException('Categories not register yet')
    return categories;
  }

  async findOne(id : number) {
    const category = await this.CategoryRepository.findOneBy({id});
    if(!category) throw new NotFoundException(`Category with id ${id} not found`)
    return category;
  }
  
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryUpdated = await this.CategoryRepository.preload({id, ...updateCategoryDto});
    if(!categoryUpdated) throw new NotFoundException();
    await this.CategoryRepository.save(categoryUpdated);
    return categoryUpdated;
  }

}
