import { CoreFetchUserUseCaseRequest } from "@/repositories/@types";
import { CheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.types";

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId, page }: CoreFetchUserUseCaseRequest) {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );

    return {
      checkIns,
    };
  }
}
