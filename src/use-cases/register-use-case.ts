import { IPrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.types";
import {
  CoreRegisterUseCaseRequest,
  ICoreUsersRepository,
} from "@/repositories/@types";

import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

export class RegisterUseCase {
  constructor(
    private usersRepository: IPrismaUsersRepository | ICoreUsersRepository
  ) {}

  async execute({ name, email, password }: CoreRegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
