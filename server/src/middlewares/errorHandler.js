import { Prisma } from "../generated/prisma/client.ts"
import { KnownError } from "../utils/errors.js"

export const errorHandler = (
  err,
  req,
  res,
  next
) => {

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({ message: err.message })
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({ code: "BAD_USER_INPUT", message: err.message })
  }

  if (err instanceof KnownError) {
    return res.status(400).json({ code: err.code, message: err.message })
  }

  res.status(500).json({ message: "Внутренняя ошибка сервера" })
}
