import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { EventModule } from './event/event.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type              : 'mysql',
      host              : 'localhost',
      database          : process.env.DB_DATABASE,
      username          : process.env.DB_USER,
      password          : process.env.DB_PASSWORD,
      port              : 3307,
      autoLoadEntities  : true,
      synchronize       : true
    }),
    UserModule,
    CommonModule,
    EventModule,
    CommentModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
