import cartSchema from "./models/cartSchema.js"
import productShema from "./models/productShema.js";

class CartMongooseDao {

    async getCarts() {
        try {
            const cartsDocument = await cartSchema.find({ enabled: true });
            return cartsDocument.map(document => ({
                _id: document._id,
                cart: document.cart,
            }))
        }
        catch (e) {
            return e
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
            return e
        }
    }

    async getCartById(cid) {
        try {
            const cartDocument = await cartSchema.findOne({ _id: cid })

            return {
                _id: cartDocument._id,
                cart: cartDocument.cart,
                enabled: cartDocument.enabled,
            }
        }
        catch (e) {
            return e
        }
    }

    async addProduct(cid, pid) {
        try {
            const productDocument = await productShema.findOne({ _id: pid });

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
            return e
        }
    }

}

export default CartMongooseDao