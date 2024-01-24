import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './entities/hero.entity';

@Module({
  controllers: [HeroController],
  imports: [TypeOrmModule.forFeature([Hero])],
  providers: [HeroService],
})
export class HeroModule {}
