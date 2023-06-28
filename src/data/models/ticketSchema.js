import mongoose, { Schema } from "mongoose"

const ticketCollection = "tickets"

const ticketSchema = new Schema({
    code: { type: String, required: true },
    purchaseDatetime: { type: Date, required: true, default: Date.now },
    products: { type: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' }, quantity: { type: Number } }] },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
})

export default mongoose.model(ticketCollection, ticketSchema)
