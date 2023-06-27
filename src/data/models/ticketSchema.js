import mongoose, { Schema } from "mongoose"
import moment from "moment"
import mongoosePaginate from "mongoose-paginate-v2"

const ticketCollection = "tickets"

const ticketSchema = new Schema({
    code: { type: String, required: true },
    purchase_datetime: {
        type: String,
        required: true,
        default: () => moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
})

ticketSchema.plugin(mongoosePaginate)

export default mongoose.model(ticketCollection, ticketSchema)