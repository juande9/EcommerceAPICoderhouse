import mongoose, { Schema } from "mongoose"

const cartsCollection = "carts"

const cartSchema = new Schema({
    cart: [{ type: ObjectId, default: [] }],
})

export default mongoose.model(cartsCollection, cartSchema)