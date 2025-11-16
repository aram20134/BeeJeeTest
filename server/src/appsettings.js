import { config } from "dotenv"

config()

export const APP_PORT = process.env.APP_PORT || 4000
export const APP_NAME = process.env.APP_NAME || "BeeJeeTestServer"
export const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h"