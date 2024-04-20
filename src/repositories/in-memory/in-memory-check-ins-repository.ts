import {
  CoreCheckIn,
  CoreCheckInCreateInput,
  ICoreCheckInRepository,
} from "@/repositories/types";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements ICoreCheckInRepository {
  // Fake database
  public checkIns: CoreCheckIn[] = [];

  async create({
    user_id,
    gym_id,
    validated_at,
  }: CoreCheckInCreateInput): Promise<CoreCheckIn> {
    const checkIn: CoreCheckIn = {
      id: randomUUID(),
      user_id,
      gym_id,
      created_at: new Date(),
      validated_at: validated_at ? new Date(validated_at) : null,
    };

    this.checkIns.push(checkIn);

    console.info("Check In created:", checkIn);

    return checkIn;
  }
}
