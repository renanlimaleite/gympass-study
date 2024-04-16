import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { logService } from "@/lib/log";
import { AuthenticateUseCase } from "@/use-cases/authenticate-use-case";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

    await authenticateUseCase.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      logService.log({
        message: `Credentials are invalid`,
        level: "error",
      });
      return reply.status(400).send(err.message);
    }

    throw err;
  }

  return reply.status(200).send();
}