import { describe, it, expect, beforeEach } from "vitest";
import { RegisterUseCase } from "./register-use-case";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able register", async () => {
    const { user } = await sut.execute({
      name: "john",
      email: "johndoe@email.com",
      password: "password",
    });

    expect(user.name).toEqual("john");
  });

  it("should hash user password upon registration", async () => {
    // const context: IPrismaUsersRepository = {
    //   async findByEmail() {
    //     return null;
    //   },

    //   async create(data) {
    //     return {
    //       id: "1",
    //       name: data.name,
    //       email: data.email,
    //       password_hash: data.password_hash,
    //       created_at: new Date(),
    //     };
    //   },
    // };

    const { user } = await sut.execute({
      name: "john",
      email: "john@example.com",
      password: "password",
    });

    const isPasswordCorreclyHashed = await compare(
      "password",
      user.password_hash
    );

    expect(user.password_hash).toBeDefined();
    expect(isPasswordCorreclyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "johndoe@email.com";

    await sut.execute({
      name: "john",
      email,
      password: "password",
    });

    expect(
      async () =>
        await sut.execute({
          name: "John Doe",
          email,
          password: "123456",
        })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
