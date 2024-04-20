import { IPrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.types";
import { CoreUser, ICoreUsersRepository } from "@/repositories/types";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileRequest {
  userId: string;
}

interface GetUserProfileResponse {
  user: User | CoreUser;
}

export class GetUserProfileUseCase {
  constructor(
    private usersRepository: IPrismaUsersRepository | ICoreUsersRepository
  ) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
