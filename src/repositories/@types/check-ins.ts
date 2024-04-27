export type CoreCheckIn = {
  id: string;
  created_at: Date;
  validated_at: Date | null;
  user_id: string;
  gym_id: string;
};

export interface CoreCheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

export type CoreCheckInCreateInput = {
  id?: string | undefined;
  created_at?: string | Date | undefined;
  validated_at?: Date | null | undefined;
  user_id: string;
  gym_id: string;
};

export interface CoreValidateCheckInUseCaseRequest {
  checkInId: string;
}

export interface ICoreCheckInRepository {
  create: ({ user_id, gym_id }: CoreCheckInCreateInput) => Promise<CoreCheckIn>;
  findById(id: string): Promise<CoreCheckIn | null>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CoreCheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CoreCheckIn[]>;
  countByUserId(userId: string): Promise<number>;
  save(checkIn: CoreCheckIn): Promise<CoreCheckIn>;
}
