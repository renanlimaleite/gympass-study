export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super(
      "The number of check-ins for the user has reached the maximum allowed."
    );
    this.name = "MaxNumberOfCheckInsError";
  }
}
