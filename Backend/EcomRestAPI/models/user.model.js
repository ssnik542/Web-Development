import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' }
}, { timestamps: true })


const USER = model('user', userSchema)
export default USER;