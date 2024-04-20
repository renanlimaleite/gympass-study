import {
  CoreUser,
  CoreUserCreateInput,
  ICoreUsersRepository,
} from "@/repositories/types";

export class InMemoryUsersRepository implements ICoreUsersRepository {
  // Fake database
  public users: CoreUser[] = [];

  async create({
    name,
    email,
    password_hash,
  }: CoreUserCreateInput): Promise<CoreUser> {
    const user: CoreUser = {
      id: String(this.users.length + 1),
      name,
      email,
      password_hash,
      created_at: new Date(),
    };

    this.users.push(user);

    console.info("User created:", user);

    return user;
  }

  async findById(id: string): Promise<CoreUser | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    console.info("User found:", user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    console.info("User found:", user);

    return user;
  }
}
