import { managerDependencies } from "../../config/managerDependencies.js";
import container from "../../container.js";

class CartManager {

    constructor() {
        this.cartDb = container.resolve(managerDependencies.cartManager)
    }

    async createCart(data) {
        return this.cartDb.createCart(data);
    }

    async getCarts() {
        return this.cartDb.getCarts();
    }

    async getCartById(cid) {
        return this.cartDb.getCartById(cid);
    }

    async addProduct(cid, pid) {
        return this.cartDb.addProduct(cid, pid);
    }

    async deleteProduct(cid, pid) {
        return this.cartDb.deleteProduct(cid, pid);
    }

    async updateQuantity(cid, pid, qty) {
        return this.cartDb.updateQuantity(cid, pid, qty);
    }

    async emptyCart(cid) {
        return this.cartDb.emptyCart(cid);
    }
}

export default CartManager