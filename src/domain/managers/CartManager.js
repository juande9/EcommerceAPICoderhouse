import container from "../../container.js";
import { nanoid } from "nanoid";

class CartManager {

    constructor() {
        this.CartRepository = container.resolve('CartRepository')
        this.ProductRepository = container.resolve('ProductRepository')
    }

    async createCart() {
        const newCart = { cart: [], enabled: true }
        return this.CartRepository.createCart(newCart);
    }

    async getCarts(params) {
        return this.CartRepository.getCarts(params);
    }

    async getCartById(cid) {
        return this.CartRepository.getCartById(cid);
    }

    async addProduct(cid, pid) {
        const productDocument = await this.ProductRepository.getProductById(pid)
        if (!productDocument) {
            throw new Error("Product not found.")
        }

        return this.CartRepository.addProduct(cid, productDocument);
    }

    async deleteProduct(cid, pid) {
        const productDocument = await this.ProductRepository.getProductById(pid)
        if (!productDocument) {
            throw new Error("Product not found.")
        }

        return this.CartRepository.deleteProduct(cid, productDocument);
    }

    async updateQuantity(cid, pid, qty) {
        const productDocument = await this.ProductRepository.getProductById(pid)

        if (!productDocument) {
            throw new Error("Product not found.")
        }

        return this.CartRepository.updateQuantity(cid, productDocument, qty);
    }

    async emptyCart(cid) {
        return this.CartRepository.emptyCart(cid);
    }

    async createTicket(user, cid) {
        const currentCart = await this.getCartById(cid);
        const code = nanoid();
        const productsInCart = [];
        const productsNotAvailable = [];
        let amount = 0;

        for (const e of currentCart.cart) {
            const cartQty = e.quantity;
            const { stock, id, price, title } = e.product;

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
                throw new Error(`Insufficient stock to complete the sale for product: ${title}`);
            }
        }

        if (productsNotAvailable.length === 0) {
            for (const p of productsInCart) {
                const { product, quantity } = p
                const productDocument = await this.ProductRepository.getProductById(product)
                const { stock } = productDocument
/* 
                await this.ProductRepository.updateStock(product, stock - quantity) */
                await this.CartRepository.deleteProduct(currentCart.id, product)
            }
        }


        const dto = {
            code,
            amount,
            products: productsInCart,
            purchaser: user
        };

        return this.CartRepository.createTicket(dto);
    }
}

export default CartManager