import { AuthService } from "../service/auth.service.js"

export const AuthController = {
  login: async (req, res) => {
    const { login, password } = req.body

    const data = await AuthService.login({ login, password })
    res.json(data)
  },
}
