import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"

import indexRoutes from "./routes/index.routes.js"
import authRoutes from "./routes/auth.routes.js"

const app = express()

app.use(cors()) //Allows React/Next frontend to communicate with Express backend. Cross origin resource sharing
app.use(helmet()) //Adds sensible security headers with almost no effort. Adds security to Express
app.use(morgan("dev")) //Logs requests, making debugging much easier.
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/', indexRoutes)
app.use('/api/auth', authRoutes)

export default app