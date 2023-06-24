import cartSchema from "../../models/cartSchema.js"
import productSchema from "../../models/productSchema.js";

class CartMongooseDao {

    async getCarts() {
        const cartsDocument = await cartSchema.find({ enabled: true });

        if (cartsDocument.length === 0) {
            throw new Error('No se encontraron carritos.');
        }

        return cartsDocument.map(document => ({
            _id: document._id,
            cart: document.cart,
        }))
    }

    async createCart(data) {
        const cartDocument = await cartSchema.create(data)
        return {
            id: cartDocument._id,
            cart: cartDocument.cart,
            enabled: cartDocument.enabled,
        }
    }

    async getCartById(cid) {
        const cartDocument = await cartSchema.findOne({ _id: cid })
        if (!cartDocument) {
            return Promise.reject(new Error(`No se encontraron carritos con id: ${cid}`))
        }

        return {
            id: cartDocument._id,
            cart: cartDocument.cart,
            enabled: cartDocument.enabled,
        }
    }

    async addProduct(cid, pid) {
        const productDocument = await productSchema.findOne({ _id: pid });
        const cartDocument = await cartSchema.findOne({ _id: cid })

        if (!productDocument) {
            throw new Error("Producto no encontrado");
        }

        const productFound = cartDocument.cart.some(item => item.product._id.equals(productDocument._id));

        if (!productFound) {
            await cartSchema.findOneAndUpdate(
                { _id: cid },
                { $push: { cart: { product: productDocument._id, quantity: 1 } } },
                { new: true },
            );
        } else {
            await cartSchema.findOneAndUpdate(
                { _id: cid, "cart.product": productDocument._id },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true }
            );
        }

        const updatedCart = await cartSchema.findOne({ _id: cid });

        return {
            id: updatedCart._id,
            cart: updatedCart.cart,
            enabled: updatedCart.enabled,
        }
    }

    async deleteProduct(cid, pid) {
        try {
            const productDocument = await productSchema.findOne({ _id: pid });

            const deletedProduct = await cartSchema.findOneAndUpdate(
                { _id: cid },
                { $pull: { cart: { product: productDocument._id } } },
                { new: true }
            );

            return {
                id: deletedProduct._id,
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
            const productDocument = await productSchema.findOne({ _id: pid });

            if (!productDocument) {
                throw new Error("Producto no encontrado");
            }

            const stockUpdated = await cartSchema.findOneAndUpdate(
                { _id: cid, "cart.product": productDocument._id },
                { $set: { "cart.$.quantity": qty } },
                { new: true }
            );

            return {
                id: stockUpdated._id,
                cart: stockUpdated.cart,
                enabled: stockUpdated.enabled,
                product: productDocument.title
            }
        }
        catch (e) {
            return e.message
        }
    }

    async emptyCart(cid) {
        try {
            const emptiedCart = await cartSchema.findOneAndUpdate(
                { _id: cid },
                { $set: { cart: [] } },
                { new: true }
            );

            if (!emptiedCart) {
                throw new Error('El carrito no existe');
            }

            return {
                id: emptiedCart._id,
                cart: emptiedCart.cart,
                enabled: emptiedCart.enabled,
            }
        }
        catch (e) {
            return e
        }
    }
}

export default CartMongooseDao