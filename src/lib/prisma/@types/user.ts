import { Prisma, User } from "@prisma/client";

export type IPrismaUser = User;

export type IPrismaUserCreateInput = Prisma.UserCreateInput;
