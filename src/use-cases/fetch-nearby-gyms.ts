import {
  CoreFetchNearbyGymUseCaseRequest,
  CoreSearchGymUseCaseRequest,
  ICoreGymsRepository,
} from "@/repositories/@types";

import { IPrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export class FetchNearbyGymUseCase {
  constructor(
    private gymRepository: IPrismaGymsRepository | ICoreGymsRepository
  ) {}

  async execute({
    userLatitude,
    userLongitude,
  }: CoreFetchNearbyGymUseCaseRequest) {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
