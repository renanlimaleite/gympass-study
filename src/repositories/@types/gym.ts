import { CoreCheckIn } from "./check-ins";

export type CoreGym = {
  id: string;
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
};

export type FindManyNearbyParams = {
  latitude: number;
  longitude: number;
};

export interface ICoreGymsRepository {
  findById(id: string): Promise<CoreGym | null>;
  findManyNearby(params: FindManyNearbyParams): Promise<CoreGym[]>;
  create(data: CoreGymCreateInput): Promise<CoreGym>;
  searchMany(query: string, page: number): Promise<CoreGym[]>;
}

export type CoreGymCreateInput = {
  id?: string;
  title: string;
  description?: string | null;
  phone?: string | null;
  latitude: number;
  longitude: number;
  checkIns?: CoreCheckIn[] | undefined;
};

export type CoreCreateGymUseCaseRequest = {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
};

export type CoreSearchGymUseCaseRequest = {
  query: string;
  page: number;
};

export type CoreFetchNearbyGymUseCaseRequest = {
  userLatitude: number;
  userLongitude: number;
};
