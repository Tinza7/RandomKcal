import { Controller, Get, Query } from '@nestjs/common';
import { FoodService } from './food.service.js';

@Controller('foods')
export class FoodController {
    constructor(private readonly foodService: FoodService) {}
    
    @Get("random")
    findRandom(@Query("categoryId") categoryId?: string) {
        return this.foodService.findRandom(categoryId);
  }
}
