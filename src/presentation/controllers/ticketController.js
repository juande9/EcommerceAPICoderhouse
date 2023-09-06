import { idValidation } from "../../domain/validations/idValidation.js";
import TicketManager from "../../domain/managers/TicketManager.js";

export const createTicket = async (req, res, next) => {
    try {
        const { cid } = req.params
        const { paymentMode } = req.query
        const validatedCartId = await idValidation.parseAsync(cid);
        const currentUser = req.user.email

        const manager = new TicketManager();
        const factoredTicket = await manager.createTicket(currentUser, validatedCartId);

        paymentMode

        if (factoredTicket.status != 'error') {
            const selectedPaymentMode = paymentMode || "mercadopago";
            const ticketData = JSON.stringify(factoredTicket);
            res.redirect(`/api/payment/create-order?ticketData=${encodeURIComponent(ticketData)}&paymentMode=${encodeURIComponent(selectedPaymentMode)}`);
        } else {
            res.status(400).send(factoredTicket);
        }
    }
    catch (e) {
        next(e)
    }
}