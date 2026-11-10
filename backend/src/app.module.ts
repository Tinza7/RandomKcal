import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { CategoryModule } from './category/category.module.js';
import { FoodModule } from './food/food.module.js';

@Module({
  imports: [PrismaModule, CategoryModule, FoodModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
