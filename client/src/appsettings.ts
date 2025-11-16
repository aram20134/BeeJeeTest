const env = import.meta.env

export const URI_BACKEND = env.VITE_URI_BACKEND || "${VITE_URI_BACKEND}"
export const COOKIE_AUTH_TOKEN = env.VITE_COOKIE_AUTH_TOKEN || "${VITE_COOKIE_AUTH_TOKEN}"