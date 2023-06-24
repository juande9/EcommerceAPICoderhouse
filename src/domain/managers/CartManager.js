import container from "../../container.js";

class CartManager {

    constructor() {
        this.CartRepository = container.resolve('CartRepository')
    }

    async createCart(data) {
        return this.CartRepository.createCart(data);
    }

    async getCarts() {
        return this.CartRepository.getCarts();
    }

    async getCartById(cid) {
        return this.CartRepository.getCartById(cid);
    }

    async addProduct(cid, pid) {
        return this.CartRepository.addProduct(cid, pid);
    }

    async deleteProduct(cid, pid) {
        return this.CartRepository.deleteProduct(cid, pid);
    }

    async updateQuantity(cid, pid, qty) {
        return this.CartRepository.updateQuantity(cid, pid, qty);
    }

    async emptyCart(cid) {
        return this.CartRepository.emptyCart(cid);
    }
}

export default CartManager