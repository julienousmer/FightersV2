import { Module } from '@nestjs/common';
import { FightersService } from './fighters.service';
import { FightersController } from './fighters.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Fighter} from "./entities/fighter.entity";

@Module({
  controllers: [FightersController],
  imports: [TypeOrmModule.forFeature([Fighter])],
  providers: [FightersService]
})
export class FightersModule {}
