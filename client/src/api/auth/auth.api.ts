import { fetchClient } from "../fetchClient"

export const AuthAPI = {
  login: async (login: string, password: string) => {
    return fetchClient.request(`/auth/login`, { method: "POST", body: { login, password } })
  }
}