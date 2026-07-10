import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            autoIndex: true,
        })
        console.log(`🍃 MongoDB connected successfully ${conn.connection.host}`)
    }
    catch (err) {
        console.log("❌ Failed to connect to MongoDB")
        console.log(err.message)
        process.exit(1)
    }
}

export default connectDB