import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function Create(name ,id, address, mobileNumber, dob, religion, gender, previousParty, mundalId, role) {
    const karykarta = await prisma.karykarta.create({
        data: {
          name,
          author:{connect:{id:id}},
          address,
          mobileNumber,
          dob,
          religion,
          gender,
          previousParty,
          mundal: { connect: { id: parseInt(mundalId) } },
          role,
        },
        include: {
          mundal: true,
          sector: true,
          poolingBooth: true,
        },
      });
      return karykarta
  }
  
