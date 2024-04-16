import { env } from "@/env";

type LogServiceLevel = "log" | "warn" | "error";

type Log = {
  fullError?: Error;
  message: string;
  level?: LogServiceLevel;
  enviroment?: string;
};

export class LogService {
  private colors = {
    log: "\x1b[37m", // white
    warn: "\x1b[33m", // yellow
    error: "\x1b[31m", // red
    reset: "\x1b[0m", // reset
  };

  public log({
    fullError,
    message,
    level = "log",
    enviroment = "dev",
  }: Log): void {
    if (env.NODE_ENV === enviroment) {
      console[level](
        fullError
          ? `${this.colors[level]}${level}:${this.colors["reset"]} ${message}\n${fullError.stack}`
          : `${this.colors[level]}${level}:${this.colors["reset"]} ${message}`
      );
      console.error();
    }
  }
}

export const logService = new LogService();
