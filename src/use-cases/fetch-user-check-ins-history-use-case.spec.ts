import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history-use-case";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Fetch user check-in history Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);
  });

  it("should be able to check-in history", async () => {
    await checkInsRepository.create({
      gym_id: "gym-id-1",
      user_id: "user-id-1",
    });

    await checkInsRepository.create({
      gym_id: "gym-id-2",
      user_id: "user-id-1",
    });

    const { checkIns } = await sut.execute({
      userId: "user-id-1",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-id-1" }),
      expect.objectContaining({ gym_id: "gym-id-2" }),
    ]);
  });

  it("should be able to fetch paginated user check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-id-${i}`,
        user_id: "user-id-1",
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user-id-1",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-id-21" }),
      expect.objectContaining({ gym_id: "gym-id-22" }),
    ]);
  });
});
