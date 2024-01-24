import { Injectable } from '@nestjs/common';
import {IFighter} from "@models/shared";


@Injectable()
export class FightersService {
  create(createFighter: IFighter) {
    return 'This action adds a new fighter';
  }

  findAll() {
    return `This action returns all fighters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fighter`;
  }

  update(id: number, updateFighter: IFighter) {
    return `This action updates a #${id} fighter`;
  }

  remove(id: number) {
    return `This action removes a #${id} fighter`;
  }
}
