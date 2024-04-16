export type CoreUser = {
  id?: string;
  name: string;
  email: string;
  password_hash: string;
  created_at?: Date | undefined | string;
};

export type CoreRegisterUseCaseRequest = {
  name: string;
  email: string;
  password: string;
};

export type CoreUserCreateInput = {
  name: string;
  email: string;
  password_hash: string;
};

export interface ICoreUsersRepository {
  create: ({
    name,
    email,
    password_hash,
  }: CoreUserCreateInput) => Promise<CoreUser>;

  findByEmail: (email: string) => Promise<CoreUser | null>;
}
