import { Router } from 'express';
import Cart from '../Cart.js';

const cartRouter = Router()
const cart = new Cart()

// Crea un nuevo carrito
cartRouter.post("/", async (req, res) => {
    const data = await cart.createCart()
    return res.status(200).send({ status: "success", message: `${data}` })
})

// Obtiene productos del carrito
cartRouter.get("/:cid", async (req, res) => {
    const id = req.params.cid
    const foundCart = await cart.getProductsCart(id)

    if (foundCart instanceof Error) {
        return res.status(400).send({ status: "error", message: `${foundCart.message}` })
    } else {
        return res.status(200).send(foundCart.cart)
    }
})

// Agrega un producto al carrito pasado por id
cartRouter.post("/:cid/product/:pid", async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const addedProduct = await cart.addProduct(idCart, idProduct)

    if (addedProduct instanceof Error) {
        return res.status(400).send({ status: "error", message: `${addedProduct}` })
    } else {
        return res.status(200).send({ status: "success", message: `${addedProduct}` })
    }
})

export default cartRouter