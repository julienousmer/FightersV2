import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbProperties } from './properties/db.properties';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FightersModule } from './fighters/fighters.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dbProperties }),
    UserModule,
    AuthModule,
    FightersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
