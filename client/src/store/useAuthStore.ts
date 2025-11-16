import { create } from "zustand"
import { AuthAPI } from "../api/auth/auth.api"
import { checkToken, deleteCookie, setCookie } from "../api/utils"
import { COOKIE_AUTH_TOKEN } from "../appsettings"
import { redirect } from "react-router"
import { jwtDecode } from "jwt-decode"
import type { User } from "../api/types"

type AuthState = {
  login: string
  password: string
  loading: boolean
  userData: User | null
  error: any

  setLogin: (value: string) => void
  setPassword: (value: string) => void
  submit: () => Promise<void>
  checkIsLoggedIn: () => Promise<void>
  logOut: () => void
}

const setUserData = (set: any, token: string) => {
  const { id, name, isAdmin }: User = jwtDecode(token)
  set({ userData: { id, name, isAdmin } })
}

export const useAuthStore = create<AuthState>((set, get) => ({
  login: "",
  password: "",
  loading: false,
  userData: null,
  error: null,

  setLogin: value => set({ login: value }),
  setPassword: value => set({ password: value }),

  submit: async () => {
    set({ loading: true, error: null })

    try {
      const { login, password } = get()

      try {
        const { token } = await AuthAPI.login(login, password)
        setUserData(set, token)
        set({ login: "", password: "" })

        setCookie(COOKIE_AUTH_TOKEN, token)
        redirect('/')
      } catch (err: any) {
        set({ error: err.message })
      }

    } finally {
      set({ loading: false })
    }
  },
  checkIsLoggedIn: async () => {
    const checkedToken = checkToken()

    if (checkedToken) {
      setUserData(set, checkedToken)
    }
  },
  logOut: () => {
    deleteCookie(COOKIE_AUTH_TOKEN)

    set({ userData: null })
  },

}))
