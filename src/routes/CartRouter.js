import { Router } from 'express';
import { getCarts, createCart, getCartById, addProduct } from '../controllers/cartController.js';

const cartRouter = Router()

cartRouter.get("/", getCarts)
cartRouter.post("/", createCart)
cartRouter.get("/:cid", getCartById)
cartRouter.post("/:cid/product/:pid", addProduct)

export default cartRouter