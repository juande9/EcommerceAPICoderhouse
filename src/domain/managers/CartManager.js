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
        const currentCart = await this.getCartById(cid)
        const code = nanoid()

        /*         const productsInCart = currentCart.cart.map(doc => {
                    const cartQty = doc.quantity
                    const stock = doc.product.stock
        
                    if (cartQty <= stock) {
                        return doc.product.id
                    } else {
                        return 'Error'
                    }
                })
        
                console.log(productsInCart) */

        const dto = {
            code,
            amount: 2,
            purchaser: user
        }

        return this.CartRepository.createTicket(dto)
    }
}


export default CartManager