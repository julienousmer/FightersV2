import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {InsertResult, Repository} from "typeorm";
import {Category} from "./entities/category.entity";

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {
    }

    async create(category: Category): Promise<InsertResult> {
        return await this.categoryRepository.insert(category);
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async findOne(id: number) {
        return await this.categoryRepository.findOneBy({id : id});
    }

    async update(id: number, category: Category) {
        return await this.categoryRepository.update(id, category);
    }

    remove(id: number) {
        return this.categoryRepository.delete(id);
    }

}

