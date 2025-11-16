import { JWT_EXPIRES_IN, JWT_SECRET } from "../appsettings.js"
import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
  const token = jwt.sign({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  })

  return token
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    throw new Error("Неизвестная ошибка")
  }
}