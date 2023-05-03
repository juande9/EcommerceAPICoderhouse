import mongoose, { Schema } from "mongoose"

const cartsCollection = "carts"

const cartSchema = new Schema({
    cart: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
        ],
        default: [],
    },
    enabled: {
        type: Boolean,
        default: true
    }
});

cartSchema.pre("find", function () {
    this.populate(["cart.product"])
})

cartSchema.pre("findOne", function () {
    this.populate(["cart.product"])
})

export default mongoose.model(cartsCollection, cartSchema)