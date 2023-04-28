import mongoose, { Schema } from "mongoose"

const productsCollection = "products"

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
})

export default mongoose.model(productsCollection, productSchema)