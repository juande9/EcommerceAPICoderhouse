import { idValidation } from "../../domain/validations/idValidation.js";
import TicketManager from "../../domain/managers/TicketManager.js";

export const createTicket = async (req, res, next) => {
    try {
        const { cid } = req.params
        const validatedCartId = await idValidation.parseAsync(cid);
        const currentUser = req.user.email

        const manager = new TicketManager();
        const factoredTicket = await manager.createTicket(currentUser, validatedCartId);

        if (factoredTicket.status != 'error') {
            const ticketData = JSON.stringify(factoredTicket);
            res.redirect(`/api/payment/create-order?ticketData=${encodeURIComponent(ticketData)}`);
        } else {
            res.status(400).send(factoredTicket);
        }
    }
    catch (e) {
        next(e)
    }
}