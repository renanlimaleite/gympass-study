import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate-use-case";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });
  it("should be able authenticate", async () => {
    await usersRepository.create({
      name: "john",
      email: "john@email.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "john@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should be not able authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "john@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should be not able authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "john",
      email: "john@email.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "john@email.com",
        password: "1234567890",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
