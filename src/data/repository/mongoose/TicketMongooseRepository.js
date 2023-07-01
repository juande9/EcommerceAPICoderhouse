import ticketSchema from "../../models/ticketSchema.js"
import Ticket from "../../../domain/entities/ticket.js"

class TicketMongooseRepository {

    async createTicket(data) {
        const ticketDocument = await ticketSchema.create(data)

        return new Ticket({
            id: ticketDocument._id,
            code: ticketDocument.code,
            purchaseDatetime: ticketDocument.purchaseDatetime,
            products: ticketDocument.products,
            amount: ticketDocument.amount,
            purchaser: ticketDocument.purchaser
        })
    }

}

export default TicketMongooseRepository