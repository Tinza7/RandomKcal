import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class FoodService {
    constructor(private readonly prisma: PrismaService) {}

     async findRandom(categoryId?: string) {
    // Guest สุ่มได้เฉพาะ System Food = ownerUserId เป็น null
    const where = {
      isActive: true,
      ownerUserId: null,
      ...(categoryId ? { categoryId } : {}),
    };

    const count = await this.prisma.food.count({ where });

    if (count === 0) {
      throw new NotFoundException("ไม่พบเมนูที่ตรงเงื่อนไข");
    }

    const skip = Math.floor(Math.random() * count);

    return this.prisma.food.findFirst({
      where,
      skip,
      orderBy: { id: "asc" },
      include: { category: true },
    });
  }
}
