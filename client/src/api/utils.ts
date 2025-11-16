import { jwtDecode } from "jwt-decode"
import { COOKIE_AUTH_TOKEN } from "../appsettings"

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\+^])/g, "\\$1") + "=([^;]*)"),
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export const setCookie = (name: string, value: string, options: any = {}) => {
  let updatedCookie = `${name}=${encodeURIComponent(value)}; path=/`

  for (const optionKey in options) {
    updatedCookie += `; ${optionKey}`
    const optionValue = options[optionKey]
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`
    }
  }

  document.cookie = updatedCookie
}

export const deleteCookie = (name: string, options: any = {}) => {
  setCookie(name, "", {
    ...options,
    "max-age": -1,
  })
}

export const tokenExpired = (token: string) => {
  if (token) {
    const decodedToken = jwtDecode(token)
    const current_time = Date.now() / 1000
    if (typeof decodedToken.exp !== "undefined") {
      return decodedToken.exp - 20 < current_time
    }
  } else {
    return true
  }
}

export const checkToken = () => {
  const authTokenCookie = getCookie(COOKIE_AUTH_TOKEN)

  if (!authTokenCookie) {
    return undefined
  }

  if (tokenExpired(authTokenCookie)) {
    deleteCookie(COOKIE_AUTH_TOKEN)
  } else {
    return authTokenCookie
  }
}
