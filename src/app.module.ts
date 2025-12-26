import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './config/typeorm.config';
import { MongoDbModule } from './config/mongodb.config';
import UserModule from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    PostgresModule,
    MongoDbModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}