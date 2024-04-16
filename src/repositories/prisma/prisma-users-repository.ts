import { IPrismaUserCreateInput } from "@/lib/prisma/@types";
import { prisma } from "@/lib/prisma/prisma-client";
import { IPrismaUsersRepository } from "./prisma-users-repository.types";

export class PrismaUsersRepository implements IPrismaUsersRepository {
  async create(data: IPrismaUserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
