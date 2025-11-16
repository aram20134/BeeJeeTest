import { prisma } from "../prisma.js"
import { BadUserInputError } from "../utils/errors.js"
import { generateToken } from "../utils/token.js"

export const AuthService = {
  login: async ({ login, password }) => {
    const user = await prisma.user.findFirst({
      where: { name: login, password },
    })

    if (!user) {
      throw new BadUserInputError("Неверные данные входа")
    }
    const token = generateToken(user)

    return { token }
  },
}
