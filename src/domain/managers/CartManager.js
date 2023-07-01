import container from "../../container.js";
import UsersManagar from '../managers/UsersManager.js'
class CartManager {

    constructor() {
        this.CartRepository = container.resolve('CartRepository')
        this.ProductRepository = container.resolve('ProductRepository')
    }

    async createCart(email) {
        const userMng = new UsersManagar()
        const user = await userMng.getOneByEmail(email)

        const cart = {
            user: user.id,
            cart: [],
            enabled: true
        }

        return this.CartRepository.createCart(cart);
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

        return this.CartRepository.deleteProduct(cid, productDocument.id);
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

}

export default CartManager