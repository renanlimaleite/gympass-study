import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-ins-use-case";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.gyms.push({
      id: "gym-id",
      title: "Gym",
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: null,
      description: null,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-id",
        userId: "user-id",
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.gyms.push({
      id: "gym-2",
      title: "Gym",
      phone: null,
      description: null,
      latitude: -27.8747279,
      longitude: -49.4889672,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-2",
        userId: "user-id",
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
