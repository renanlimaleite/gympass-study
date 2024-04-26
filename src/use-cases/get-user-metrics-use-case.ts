import { CoreMetricsUserUseCaseRequest } from "@/repositories/@types";
import { CheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.types";

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId }: CoreMetricsUserUseCaseRequest) {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}
