import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profile-use-case";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("GetUserProfile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "john",
      email: "john@email.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id || "",
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("john");
  });

  it("should be not able get user profile with wrong id", async () => {
    expect(() => sut.execute({ userId: "wrong-id" })).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
