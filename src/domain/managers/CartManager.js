import container from "../../../container.js";

class CartManager {

    constructor() {
        this.cartDao = container.resolve('CartDao')
    }

    async createCart(data) {
        return this.cartDao.createCart(data);
    }

    async getCarts() {
        return this.cartDao.getCarts();
    }

    async getCartById(cid) {
        return this.cartDao.getCartById(cid);
    }

    async addProduct(cid, pid) {
        return this.cartDao.addProduct(cid, pid);
    }

    async deleteProduct(cid, pid) {
        return this.cartDao.deleteProduct(cid, pid);
    }

    async updateQuantity(cid, pid, qty) {
        return this.cartDao.updateQuantity(cid, pid, qty);
    }

    async emptyCart(cid) {
        return this.cartDao.emptyCart(cid);
    }
}

export default CartManager