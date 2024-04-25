import { CheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.types";
import { CoreCheckInUseCaseRequest } from "@/repositories/@types/check-ins";
import { ICoreGymsRepository } from "@/repositories/@types";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: ICoreGymsRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CoreCheckInUseCaseRequest) {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    // calcular distance between user and gym, if > 100 meters, throw error
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude, longitude: gym.longitude }
    );

    console.log({ distance });

    const MAX_DISTANCE_IN_KILOMETERS = 0.1; // 100 meters

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error("User is too far from gym");
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDate) {
      throw new Error("User already checked in today");
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return {
      checkIn,
    };
  }
}
