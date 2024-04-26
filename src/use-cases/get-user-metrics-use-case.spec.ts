import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics-use-case";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      gym_id: "gym-id-1",
      user_id: "user-id-1",
    });

    await checkInsRepository.create({
      gym_id: "gym-id-2",
      user_id: "user-id-1",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-id-1",
    });

    expect(checkInsCount).toBe(2);
  });
});
