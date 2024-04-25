import {
  CoreCheckIn,
  CoreCheckInCreateInput,
  ICoreCheckInRepository,
} from "@/repositories/@types";
import dayjs from "dayjs";
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

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkOnSameDate = this.checkIns.find((checkin) => {
      const checkInDate = dayjs(checkin.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkin.user_id === userId && isOnSameDate;
    });

    if (!checkOnSameDate) {
      return null;
    }

    return checkOnSameDate;
  }
}
