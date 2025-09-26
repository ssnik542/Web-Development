import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const refreshSchema = new Schema({
    refresh_token: { type: String, unique: true },
})


const REFRESH = model('refresh', refreshSchema)
export default REFRESH;