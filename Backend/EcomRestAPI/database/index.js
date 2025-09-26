import { mongoose } from "mongoose"
import { MONGODB_URI } from "../config"

const connectDB = async () => {
    try {
        const dbConnect = await mongoose.connect(`${MONGODB_URI}/EcomRestAPI`)
        console.log(dbConnect.connection.host)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB