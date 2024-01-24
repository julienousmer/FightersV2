import { Injectable } from '@nestjs/common';
import {IFighter} from "@models/shared";
import {InjectRepository} from "@nestjs/typeorm";
import {Fighter} from "./entities/fighter.entity";
import {Repository} from "typeorm";


@Injectable()
export class FightersService {
 constructor(
     @InjectRepository(Fighter) private readonly fighterRepository: Repository<Fighter>,
 ) {}

  async create(createFighter: Fighter) {
    return await this.fighterRepository.insert(createFighter);
  }

  async findAll(): Promise<Fighter[]> {
   return await this.fighterRepository.find();
  }

  async findOne(id: number): Promise<Fighter> {
    return await this.fighterRepository.findOneBy({id: id});
  }

  async update(id: number, updateFighter: Fighter) {
    return await this.fighterRepository.update(id, updateFighter);
  }

  remove(id: number) {
    return this.fighterRepository.delete(id);
  }
}
