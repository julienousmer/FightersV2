import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { Hero } from './entities/hero.entity';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero) private readonly heroRepository: Repository<Hero>,
  ) {}
  // constructor() {

  // }

  async create(createHeroDto: CreateHeroDto): Promise<InsertResult> {
    return await this.heroRepository.insert(createHeroDto);
  }

  async findAll(): Promise<Hero[]> {
    return await this.heroRepository.find();
  }

  async findOne(id: number) {
    return await this.heroRepository.findOneBy({ id: id });
  }

  async update(id: number, updateHeroDto: UpdateHeroDto) {
    return await this.heroRepository.update(id, updateHeroDto);
  }

  remove(id: number) {
    return this.heroRepository.delete(id);
  }
}
