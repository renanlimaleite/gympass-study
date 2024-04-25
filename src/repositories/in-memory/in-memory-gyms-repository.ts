import { CoreGym, ICoreGymsRepository } from "../@types";

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
}
