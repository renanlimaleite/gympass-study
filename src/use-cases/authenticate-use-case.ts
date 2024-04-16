import { IPrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.types";
import { CoreUser, ICoreUsersRepository } from "@/repositories/types";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User | CoreUser;
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: IPrismaUsersRepository | ICoreUsersRepository
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, user.password_hash);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
