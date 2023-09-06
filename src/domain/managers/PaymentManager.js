import mercadopago from "mercadopago";
import Stripe from "stripe";

class PaymentManager {
    
    async createOrderWithMercadoPago(factoredTicket) {
        try {
            mercadopago.configure({ access_token: process.env.MP_TEST_ACCESSTOKEN })

            if (!factoredTicket.products || factoredTicket.products.length === 0) {
                throw new Error("Ticket data is incomplete.");
            }

            const products = await Promise.all(factoredTicket.products.map(async (product) => {
                return {
                    id: product.product,
                    unit_price: product.price,
                    currency_id: 'ARS',
                    quantity: product.quantity
                };
            }));


            const result = await mercadopago.preferences.create({
                items: products,
                back_urls: {
                    success: 'http://localhost:8081/api/payment/success',
                    failure: 'http://localhost:8081/api/payment/failure',
                },
            });

            return result.body.init_point;
        }
        catch (e) {
            throw e;
        }
    }

    async createOrderWithStripe(factoredTicket) {
        try {
            if (!factoredTicket.products || factoredTicket.products.length === 0) {
                throw new Error("Ticket data is incomplete.");
            }

            const stripe = new Stripe(process.env.STRIPE_TEST_ACCESSTOKEN);

            const products = factoredTicket.products.map(product => ({
                price_data: {
                    currency: 'ARS',
                    product_data: {
                        name: product.product,
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.quantity,
            }));;

            const session = await stripe.checkout.sessions.create({
                line_items: products,
                mode: 'payment',
                success_url: 'http://localhost:8081/api/payment/success',
                cancel_url: 'http://localhost:8081/api/payment/failure'
            });

            return session.url;
        }
        catch (e) {
            throw e;
        }
    }
}

export default PaymentManager;