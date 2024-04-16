import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { logService } from "./lib/log";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: "Invalid request body",
      issues: error.format(),
    });
  }

  logService.log({
    fullError: error,
    message: `Internal server error: ${error}`,
    level: "error",
  });

  reply.status(500).send({
    message: "Internal server error",
  });
});
