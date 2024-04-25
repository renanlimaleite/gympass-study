import {
  CoreCreateGymUseCaseRequest,
  ICoreGymsRepository,
} from "@/repositories/@types";

import { IPrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export class CreateGymUseCase {
  constructor(
    private gymRepository: IPrismaGymsRepository | ICoreGymsRepository
  ) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CoreCreateGymUseCaseRequest) {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return {
      gym,
    };
  }
}
