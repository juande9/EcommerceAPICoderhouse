import cartSchema from "../../data/models/cartSchema.js";

class Cart {

    constructor(params) {
        this.id = params.id;
        this.cart = params.cart;
        this.enabled = params.enabled;
    }

    static async addNewProduct(cid, product) {
        await cartSchema.findOneAndUpdate(
            { _id: cid },
            { $push: { cart: { product: product.id, quantity: 1 } } },
            { new: true },
        )
    }

    static async addProduct(cid, product) {
        await cartSchema.findOneAndUpdate(
            { _id: cid, "cart.product": product.id },
            { $inc: { "cart.$.quantity": 1 } },
            { new: true }
        );
    }

    static async deleteProduct(cid, product) {
        const newCart = await cartSchema.findOneAndUpdate(
            { _id: cid },
            { $pull: { cart: { product: product.id } } },
            { new: true }
        )
        return newCart
    }

    static async updateQuantity(cid, product, qty) {
        const newStock = await cartSchema.findOneAndUpdate(
            { _id: cid, "cart.product": product.id },
            { $set: { "cart.$.quantity": qty } },
            { new: true }
        );
        return newStock
    }
}

export default Cart