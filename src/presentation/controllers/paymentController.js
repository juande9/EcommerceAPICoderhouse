import mercadopago from "mercadopago"

export const createOrder = async (req, res, next) => {
    try {

        if (!req.query.ticketData) {
            return res.status(400).send({ status: "error", message: "Ticket data is missing." });
        }

        const ticketData = req.query.ticketData;
        const factoredTicket = JSON.parse(decodeURIComponent(ticketData))


        mercadopago.configure({
            access_token: process.env.MP_TEST_ACCESSTOKEN
        })

        if (!factoredTicket.products || factoredTicket.products.length === 0) {
            return res.status(400).send({ status: "error", message: "Ticket data is incomplete." });
        }

        const products = factoredTicket.products.map(product => {
            return {
                id: product.product,
                unit_price: product.price,
                currency_id: 'ARS',
                quantity: product.quantity
            }
        })

        const result = await mercadopago.preferences.create({
            items: products,
        })
        
        return res.status(200).send({ status: "success", payment_url: result.body.init_point });
    }
    catch (e) {
        next(e)
    }
}