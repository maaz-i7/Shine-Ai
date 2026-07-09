import connectDB from "./config/db.js"
import app from "./app.js"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT

const startServer = async () => {
    try {
        console.log(process.env.MONGO_URI);
        await connectDB()
        app.listen(PORT, () => {
            console.log(`🗼 Server is up at PORT ${PORT}`)
        })
    }
    catch(err) {
        console.log("❌ Failed to start server")
        console.log(err.message)
        process.exit(1)
    }
}

startServer()