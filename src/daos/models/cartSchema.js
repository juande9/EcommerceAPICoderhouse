import mongoose, { Schema } from "mongoose"

const cartsCollection = "carts"

const cartSchema = new Schema({
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    enabled: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model(cartsCollection, cartSchema)