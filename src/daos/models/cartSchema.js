import mongoose, { Schema } from "mongoose"

const cartsCollection = "carts"

const cartSchema = new Schema({
    cart: [{ type: ObjectId, default: [] }],
    status: { type: Boolean, default: true }
})

export default mongoose.model(cartsCollection, cartSchema)