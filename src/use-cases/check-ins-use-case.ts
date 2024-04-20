import { CheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.types";
import { CoreCheckInUseCaseRequest } from "@/repositories/types/check-ins";

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId, gymId }: CoreCheckInUseCaseRequest) {
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return {
      checkIn,
    };
  }
}
