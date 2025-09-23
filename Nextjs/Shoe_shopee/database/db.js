import mongoose from "mongoose";
import { DB_NAME } from '../utils/data'
export const dbConnect = async () => {
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log('db is connect succesfully')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}