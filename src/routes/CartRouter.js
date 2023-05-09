import { Router } from 'express';
import { getCarts, createCart, getCartById, addProduct, deleteProduct, updateQuantity, emptyCart } from '../controllers/cartController.js';

const cartRouter = Router()

cartRouter.get("/", getCarts)
cartRouter.post("/", createCart)
cartRouter.get("/:cid", getCartById)
cartRouter.post("/:cid/products/:pid", addProduct)
cartRouter.delete("/:cid/products/:pid", deleteProduct)
cartRouter.put("/:cid/products/:pid", updateQuantity)
cartRouter.delete("/:cid", emptyCart)

export default cartRouter