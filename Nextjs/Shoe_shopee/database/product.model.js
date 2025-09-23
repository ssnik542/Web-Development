import mongoose from "mongoose";


const imageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true }
})

const sizeSchema = new mongoose.Schema({
    size: { type: String, required: true },
    enabled: { type: Boolean, required: true }
})

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: [imageSchema],
    original_price: { type: Number, required: true },
    size: [sizeSchema]
}, { timestamps: true })

export const Product = mongoose.models.products || mongoose.model('products', productSchema)