import emailManager from "../../utils/emailManager.js";
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
/*             const email = new emailManager()
            await email.sendMail({ to: currentUser, code: factoredTicket.code }) */
            res.status(201).send({ status: "success", message: `Ticket creado correctamente.`, ticket: factoredTicket })
        } else {
            res.status(404).send(factoredTicket)
        }
    }
    catch (e) {
        next(e)
    }
}