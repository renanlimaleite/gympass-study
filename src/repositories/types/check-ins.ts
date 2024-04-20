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
}

interface CheckInUseCaseResponse {
  checkIn: CoreCheckIn;
}

export type CoreCheckInCreateInput = {
  id?: string | undefined;
  created_at?: string | Date | undefined;
  validated_at?: Date | null | undefined;
  user_id: string;
  gym_id: string;
};

export interface ICoreCheckInRepository {
  create: ({ user_id, gym_id }: CoreCheckInCreateInput) => Promise<CoreCheckIn>;
}
