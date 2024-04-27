import { randomUUID } from "crypto";
import {
  CoreGym,
  CoreGymCreateInput,
  FindManyNearbyParams,
  ICoreGymsRepository,
} from "../@types";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class InMemoryGymsRepository implements ICoreGymsRepository {
  // Fake database
  public gyms: CoreGym[] = [];

  async findById(id: string): Promise<CoreGym | null> {
    const gym = this.gyms.find((gym) => gym.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async create({
    id,
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CoreGymCreateInput): Promise<CoreGym> {
    const gym = {
      id: id ?? randomUUID(),
      title,
      description: description ?? null,
      phone: phone ?? null,
      latitude,
      longitude,
    };

    this.gyms.push(gym);

    return gym;
  }

  async searchMany(query: string, page: number): Promise<CoreGym[]> {
    const gyms = this.gyms.filter((gym) => {
      return gym.title.includes(query);
    });

    const start = (page - 1) * 20;
    const end = page * 20;

    return gyms.slice(start, end);
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<CoreGym[]> {
    const { latitude, longitude } = params;

    return this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        { latitude: gym.latitude, longitude: gym.longitude }
      );

      return distance < 10;
    });
  }
}
