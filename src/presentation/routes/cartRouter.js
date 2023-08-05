import { Router } from 'express';
import { getCarts, createCart, getCartById, addProduct, deleteProduct, updateQuantity, emptyCart, deleteCart } from '../controllers/cartController.js';
import { createTicket } from '../controllers/ticketController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const cartRouter = Router()

cartRouter.get("/", getCarts)
cartRouter.get("/:cid", getCartById)
cartRouter.delete("/:cid", auth, authorization('deleteCart'), deleteCart)
cartRouter.post("/", auth, authorization('createCart'), createCart)
cartRouter.post("/:cid/products/:pid", auth, authorization('addProductCart'), addProduct)
cartRouter.delete("/:cid/products/:pid", auth, authorization('deleteProductCart'), deleteProduct)
cartRouter.put("/:cid/products/:pid", auth, authorization('updateProductCart'), updateQuantity)
cartRouter.delete("/:cid/products", auth, authorization('emptyCart'), emptyCart)
cartRouter.post("/:cid/purchase", auth, authorization('endPurchase'), createTicket)

export default cartRouter