
export class KnownError extends Error {
  code
  extensions
  status
}

export class BadUserInputError extends KnownError {
  constructor(message, extensions, status = 400) {
    super(message)
    this.name = "BadUserInputError"
    this.code = "BAD_USER_INPUT"
    this.extensions = extensions
    this.status = status
  }
}