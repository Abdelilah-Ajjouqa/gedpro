import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './config/typeorm.config';
import { MongoDbModule } from './config/mongodb.config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PostgresModule, MongoDbModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
