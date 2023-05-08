import CartMongooseDao from "../daos/CartMongooseDao.js";

class CartManager {

    constructor() {

        this.dao = new CartMongooseDao()

    }

    async createCart(data) {
        try {
            return this.dao.createCart(data);
        }
        catch (e) {
            return e
        }
    }

    async getCarts() {
        try {
            return this.dao.getCarts();
        }
        catch (e) {
            return e
        }
    }

    async getCartById(cid) {
        try {
            return this.dao.getCartById(cid);
        }
        catch (e) {
            return e
        }
    }

    async addProduct(cid, pid) {
        try {
            return this.dao.addProduct(cid, pid);
        }
        catch (e) {
            return e
        }
    }

    async deleteProduct(cid, pid) {
        try {
            return this.dao.deleteProduct(cid, pid);
        }
        catch (e) {
            return e
        }
    }

    async updateQuantity(cid, pid, qty) {
        try {
            return this.dao.updateQuantity(cid, pid, qty);
        }
        catch (e) {
            return e
        }
    }



}

export default CartManager