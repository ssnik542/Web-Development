import dotenv from 'dotenv'

dotenv.config();

export const {
    PORT,
    DEBUG_MODE,
    MONGODB_URI,
    JWT_SECRET,
    REFERESH_SECRET
} = process.env;