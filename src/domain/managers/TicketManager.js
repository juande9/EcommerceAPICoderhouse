import container from "../../container.js";
import { nanoid } from "nanoid";

class TicketManager {

    constructor() {
        this.TicketRepository = container.resolve('TicketRepository')
        this.CartRepository = container.resolve('CartRepository')
        this.ProductRepository = container.resolve('ProductRepository')
    }

    async createTicket(user, cid) {
        const currentCart = await this.CartRepository.getCartById(cid);
        const code = nanoid();
        const { productsInCart, productsNotAvailable, amount } = await this.getAvailableProductsInCart(currentCart.cart);

        if (productsNotAvailable.length > 0 || productsInCart.length === 0) {
            return {
                status: "error",
                message: "Insufficient stock to complete the sale or the cart is empty.",
                payload: productsNotAvailable
            };
        }

        for (const p of productsInCart) {
            const { product, quantity } = p;
            const productDocument = await this.ProductRepository.getProductById(product);
            const { stock } = productDocument;
            await this.ProductRepository.updateStock(product, stock - quantity);
            await this.CartRepository.deleteProduct(cid, product);
        }

        const dto = {
            code,
            amount,
            products: productsInCart,
            purchaser: user
        };

        return this.TicketRepository.createTicket(dto);
    }

    async getAvailableProductsInCart(cart) {
        const productsInCart = [];
        const productsNotAvailable = [];
        let amount = 0;

        for (const e of cart) {
            const cartQty = e.quantity;
            const { stock, id, price } = e.product;

            if (cartQty <= stock) {
                const total = price * cartQty;
                const productDocument = await this.ProductRepository.getProductById(id);

                productsInCart.push({
                    product: productDocument.id,
                    quantity: cartQty,
                    price,
                    total
                });
                amount += total;
            } else {
                productsNotAvailable.push({ product: id });
            }
        }

        return { productsInCart, productsNotAvailable, amount };
    }


}

export default TicketManager