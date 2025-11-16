import { verifyToken } from "../utils/token.js"

export const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: "Нет доступа" })

  const token = authHeader.replace("Bearer ", "")
  try {
    const payload = verifyToken(token)
    if (!payload.isAdmin) throw new Error()
    next()
  } catch {
    return res.status(401).json({ message: "Нет доступа" })
  }
}