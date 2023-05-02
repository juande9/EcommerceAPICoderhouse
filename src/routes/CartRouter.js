import { Router } from 'express';
import { getCarts, createCart, getCartById, addProduct } from '../controllers/cartController.js';

const cartRouter = Router()

cartRouter.get("/", getCarts)
cartRouter.post("/", createCart)
cartRouter.get("/:cid", getCartById)
cartRouter.post("/:cid/product/:pid", addProduct)


 // Agrega un producto al carrito pasado por id
/* cartRouter.post("/:cid/product/:pid", async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const addedProduct = await cart.addProduct(idCart, idProduct)

    if (addedProduct instanceof Error) {
        return res.status(400).send({ status: "error", message: `${addedProduct}` })
    } else {
        return res.status(200).send({ status: "success", message: `${addedProduct}` })
    }
})  
 */
export default cartRouter