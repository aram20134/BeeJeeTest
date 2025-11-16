import { format } from "url"

const urlForHttpServer = (httpServer, pathname = "/") => {
  const { address, port } = httpServer.address()

  const hostname = address === "" || address === "::" ? "localhost" : address

  return format({
    protocol: "http",
    hostname,
    port,
    pathname
  })
}

export { urlForHttpServer }
