import cartSchema from "./models/cartSchema.js"
import productShema from "./models/productShema.js";

class CartMongooseDao {

    async getCarts() {
        try {
            const cartsDocument = await cartSchema.find({ enabled: true });

            if (cartsDocument.length === 0) {
                throw new Error('No se encontraron carritos.');
            }

            return cartsDocument.map(document => ({
                _id: document._id,
                cart: document.cart,
            }))
        }
        catch (e) {
            return e.message
        }
    }

    async createCart(data) {
        try {
            const cartDocument = await cartSchema.create(data)
            return {
                _id: cartDocument._id,
                cart: cartDocument.cart,
                enabled: cartDocument.enabled,
            }
        }
        catch (e) {
            return e.message
        }
    }

    async getCartById(cid) {
        try {
            const cartDocument = await cartSchema.findOne({ _id: cid })

            if (!cartDocument) throw new Error(`No se encontraron carritos con id: ${cid}`);

            return {
                _id: cartDocument._id,
                cart: cartDocument.cart,
                enabled: cartDocument.enabled,
            }
        }
        catch (e) {
            return e.message
        }
    }

    async addProduct(cid, pid) {
        try {
            const productDocument = await productShema.findOne({ _id: pid });

            if (!productDocument) throw new Error("Producto no encontrado")

            const updateProdQuantity = await cartSchema.findOneAndUpdate(
                { _id: cid, "cart.product": productDocument._id },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true }
            );

            if (!updateProdQuantity) {
                await cartSchema.updateOne(
                    { _id: cid },
                    { $push: { cart: { product: productDocument._id, quantity: 1 } } },
                    { new: true },
                )
            }

            return {
                _id: updateProdQuantity._id,
                cart: updateProdQuantity.cart,
                enabled: updateProdQuantity.enabled,
            }
        }
        catch (e) {
            return e.message
        }
    }

    async deleteProduct(cid, pid) {
        try {
            const deletedProduct = await cartSchema.findOneAndUpdate(
                { _id: cid },
                { $pull: { cart: { product: pid } } },
                { new: true }
            );

            return {
                _id: deletedProduct._id,
                cart: deletedProduct.cart,
                enabled: deletedProduct.enabled,
            }
        }
        catch (e) {
            return e.message
        }
    }

    async updateQuantity(cid, pid, qty) {
        try {
            const productDocument = await productShema.findOne({ _id: pid });

            if (!productDocument) throw new Error("Producto no encontrado")

            const stockUpdated = await cartSchema.findOneAndUpdate(
                { _id: cid, "cart.product": productDocument._id },
                { $set: { "cart.$.quantity": qty } },
                { new: true }
            );

            return {
                _id: stockUpdated._id,
                cart: stockUpdated.cart,
                enabled: stockUpdated.enabled,
                product: productDocument.title
            }
        }
        catch (e) {
            return e.message
        }
    }
}

export default CartMongooseDao