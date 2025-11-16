import express from 'express'
import cors from 'cors'
import http from 'http'
import { APP_PORT, APP_NAME } from './appsettings.js'
import { urlForHttpServer } from './utils/urlForHttpServer.js'
import tasksRoutes from "./routes/tasks.routes.js"
import authRoutes from "./routes/auth.routes.js"
import { errorHandler } from './middlewares/errorHandler.js'

const startServer = () => {
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.use("/tasks", tasksRoutes)
  app.use("/auth", authRoutes)
  app.use(errorHandler)

  const httpServer = http.createServer(app)

  httpServer.listen(APP_PORT, () => {
    console.log(`🚀 ${APP_NAME} ready at ${urlForHttpServer(httpServer, "/")}`)
  })

}

startServer()