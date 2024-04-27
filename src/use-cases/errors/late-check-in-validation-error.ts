export class LateCheckInValidateError extends Error {
  constructor() {
    super("The check-in is late.");
    this.name = "LateCheckInValidateError";
  }
}
