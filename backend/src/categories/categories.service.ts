import { Injectable } from '@nestjs/common';
import {ICategory} from '@models/shared';

@Injectable()
export class CategoriesService {
  create(createCategory: ICategory) {
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategory: ICategory) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
