export type CoreGym = {
  id: string;
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
};

export interface ICoreGymsRepository {
  findById(id: string): Promise<CoreGym | null>;
}
