import { randomUUID } from "crypto";
import { CoreGym, CoreGymCreateInput, ICoreGymsRepository } from "../@types";

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
}
