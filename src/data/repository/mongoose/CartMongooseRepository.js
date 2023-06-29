import cartSchema from "../../models/cartSchema.js"
import ticketSchema from "../../models/ticketSchema.js"
import Cart from "../../../domain/entities/cart.js"
import Ticket from "../../../domain/entities/ticket.js"

class CartMongooseRepository {

    async getCarts(params) {
        const { limit = 10, page } = params
        const paginateOptions = {
            limit: limit || 10,
            page: page || 1,
        }

        const cartsDocument = await cartSchema.paginate({}, paginateOptions)
        const { docs, ...pagination } = cartsDocument

        const carts = docs.map(document => new Cart({
            id: document._id,
            cart: document.cart,
        }))

        return {
            carts,
            pagination
        }
    }

    async createCart(data) {
        const cartDocument = await cartSchema.create(data)

        return new Cart({
            id: cartDocument._id,
            cart: cartDocument.cart,
            enabled: cartDocument.enabled,
        })
    }

    async getCartById(cid) {
        const cartDocument = await cartSchema.findOne({ _id: cid })

        if (!cartDocument) {
            throw new Error(`No se encontraron carritos con id: ${cid}`)
        }

        return new Cart({
            id: cartDocument._id,
            cart: cartDocument.cart,
            enabled: cartDocument.enabled,
        })
    }

    async addProduct(cid, product) {
        const cartDocument = await cartSchema.findOne({ _id: cid });
        const productExist = cartDocument.cart.some(item => item.product._id.equals(product.id));

        productExist ? Cart.addProduct(cid, product) : Cart.addNewProduct(cid, product);

        const updatedCart = await cartSchema.findOne({ _id: cid });

        return new Cart({
            id: updatedCart._id,
            cart: updatedCart.cart,
            enabled: updatedCart.enabled,
        });
    }

    async deleteProduct(cid, product) {
        const cartDocument = await cartSchema.findOneAndUpdate(
            { _id: cid },
            { $pull: { cart: { product: product } } },
            { new: true }
        );

        if (cartDocument) {
            return new Cart({
                id: cartDocument._id,
                cart: cartDocument.cart,
                enabled: cartDocument.enabled,
            })
        }
        throw new Error('Product not found in cart.');
    }

    async updateQuantity(cid, product, qty) {
        console.log(product.id)
        const cartDocument = await cartSchema.findOneAndUpdate(
            { _id: cid, 'cart.product': product.id },
            { $set: { 'cart.$.quantity': qty } },
            { new: true }
        );

        if (cartDocument) {
            return new Cart({
                id: cartDocument._id,
                cart: cartDocument.cart,
                enabled: cartDocument.enabled,
            });
        }

        throw new Error('Product not found in cart.');
    }


    async emptyCart(cid) {
        const emptiedCart = await cartSchema.findOneAndUpdate(
            { _id: cid },
            { $set: { cart: [] } },
            { new: true }
        );

        if (!emptiedCart) {
            throw new Error('El carrito no existe');
        }

        return emptiedCart
    }

    async createTicket(data) {
        const ticketDocument = await ticketSchema.create(data)

        return new Ticket({
            id: ticketDocument._id,
            code: ticketDocument.code,
            purchaseDatetime: ticketDocument.purchaseDatetime,
            products: ticketDocument.products,
            amount: ticketDocument.amount,
            purchaser: ticketDocument.purchaser
        })
    }

}

export default CartMongooseRepository