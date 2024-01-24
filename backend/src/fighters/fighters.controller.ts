import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FightersService } from './fighters.service';
import {Fighter} from '@models/shared';

@Controller('fighters')
export class FightersController {
  constructor(private readonly fightersService: FightersService) {}

  @Post()
  create(@Body() createFighter: Fighter) {
    return this.fightersService.create(createFighter);
  }

  @Get()
  findAll() {
    return this.fightersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fightersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFighter: Fighter) {
    return this.fightersService.update(+id, updateFighter);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fightersService.remove(+id);
  }
}
