import PaymentManager from "../../domain/managers/PaymentManager.js";

export const createOrder = async (req, res, next) => {
    try {
        const paymentMode = req.query.paymentMode

        if (!req.query.ticketData) {
            return res.status(400).send({ status: "error", message: "Ticket data is missing." });
        }

        const ticketData = req.query.ticketData;
        const factoredTicket = JSON.parse(decodeURIComponent(ticketData))
        const manager = new PaymentManager(paymentMode);

        const paymentMethods = {
            mercadopago: manager.createOrderWithMercadoPago,
            stripe: manager.createOrderWithStripe,
        };

        if (!paymentMethods[paymentMode]) {
            return res.status(400).send({ status: "error", message: "Invalid payment mode." });
        }

        const result = await paymentMethods[paymentMode](factoredTicket);
        return res.status(200).send({ status: "success", payment_url: result, factoredTicket });
    }
    catch (e) {
        next(e)
    }
}