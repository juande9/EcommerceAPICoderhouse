import { Router } from 'express';
import { getCarts, createCart, getCartById, addProduct, deleteProduct, updateQuantity, emptyCart } from '../controllers/cartController.js';
import { createTicket } from '../controllers/ticketController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const cartRouter = Router()

cartRouter.get("/", getCarts)
cartRouter.post("/", auth, authorization('getCart'), createCart)
cartRouter.get("/:cid", getCartById)
cartRouter.post("/:cid/products/:pid", auth, authorization('addProductCart'), addProduct)
cartRouter.delete("/:cid/products/:pid", auth, authorization('deleteProductCart'), deleteProduct)
cartRouter.put("/:cid/products/:pid", auth, authorization('updateProductCart'), updateQuantity)
cartRouter.delete("/:cid", auth, authorization('emptyCart'), emptyCart)
cartRouter.post("/:cid/purchase", auth, authorization('endPurchase'), createTicket)

export default cartRouter