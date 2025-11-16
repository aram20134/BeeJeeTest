import { URI_BACKEND } from "../appsettings"
import { checkToken } from "./utils"

export class FetchClientConstructor {
  endpoint: string
  defaultMethod: string

  constructor(endpoint: string, defaultMethod: string = "POST") {
    this.endpoint = endpoint
    this.defaultMethod = defaultMethod
  }

  request = async (query: string, options: any = {}): Promise<any> => {
    const token = checkToken()
    const url = `${this.endpoint}${query}`

    const response = await fetch(url, {
      method: options.method || this.defaultMethod,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    })

    const dataOrError = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(dataOrError.message || "Ошибка сервера")
    }

    return dataOrError
  }
}

export const fetchClient = new FetchClientConstructor(URI_BACKEND)