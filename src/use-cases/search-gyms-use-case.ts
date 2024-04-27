import {
  CoreSearchGymUseCaseRequest,
  ICoreGymsRepository,
} from "@/repositories/@types";

import { IPrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export class SearchGymUseCase {
  constructor(
    private gymRepository: IPrismaGymsRepository | ICoreGymsRepository
  ) {}

  async execute({ query, page }: CoreSearchGymUseCaseRequest) {
    const gyms = await this.gymRepository.searchMany(query, page);

    return {
      gyms,
    };
  }
}
