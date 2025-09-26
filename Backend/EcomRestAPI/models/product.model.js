import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    image: { type: String, default: 'piiza.jpeg' }
}, { timestamps: true })


const PRODUCT = model('product', productSchema)
export default PRODUCT;