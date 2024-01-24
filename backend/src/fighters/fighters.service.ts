import { Injectable } from '@nestjs/common';
import {Fighter} from "@models/shared";


@Injectable()
export class FightersService {
  create(createFighter: Fighter) {
    return 'This action adds a new fighter';
  }

  findAll() {
    return `This action returns all fighters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fighter`;
  }

  update(id: number, updateFighter: Fighter) {
    return `This action updates a #${id} fighter`;
  }

  remove(id: number) {
    return `This action removes a #${id} fighter`;
  }
}
