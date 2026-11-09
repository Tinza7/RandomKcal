import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const data = [
  {
    category: "อาหารจานเดียว",
    foods: ["ข้าวกะเพราไก่ไข่ดาว", "ข้าวผัดกุ้ง", "ข้าวมันไก่", "ข้าวหมูทอดกระเทียม"],
  },
  {
    category: "ก๋วยเตี๋ยว",
    foods: ["ก๋วยเตี๋ยวเรือ", "ราดหน้าหมู", "ผัดซีอิ๊วไก่"],
  },
  {
    category: "อาหารเบา ๆ",
    foods: ["ส้มตำไทย", "ยำวุ้นเส้น", "สลัดอกไก่", "ต้มจืดเต้าหู้หมูสับ"],
  },
];

async function main() {
  // ล้างเฉพาะ System Food (ownerUserId = null) เพื่อให้รันซ้ำได้โดยไม่เกิดข้อมูลซ้ำ
  await prisma.food.deleteMany({ where: { ownerUserId: null } });

  for (const item of data) {
    const category = await prisma.category.upsert({
      where: { name: item.category },
      update: {},
      create: { name: item.category },
    });

    await prisma.food.createMany({
      data: item.foods.map((name) => ({ name, categoryId: category.id })),
    });
  }

  console.log("Seed เสร็จแล้ว");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());