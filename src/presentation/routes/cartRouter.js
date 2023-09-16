import { Router } from 'express';
import CartController from '../controllers/cartController.js';
import { createTicket } from '../controllers/ticketController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const cartRouter = Router()

const cartController = new CartController()

cartRouter.get("/", cartController.getCarts);
cartRouter.get("/:cid", cartController.getCartById)
cartRouter.delete("/:cid", auth, authorization('deleteCart'), cartController.deleteCart)
cartRouter.post("/", auth, authorization('createCart'), cartController.createCart)
cartRouter.post("/:cid/products/:pid", auth, authorization('addProductCart'), cartController.addProduct)
cartRouter.delete("/:cid/products/:pid", auth, authorization('deleteProductCart'), cartController.deleteProduct)
cartRouter.put("/:cid/products/:pid", auth, authorization('updateProductCart'), cartController.updateQuantity)
cartRouter.delete("/:cid/products", auth, authorization('emptyCart'), cartController.emptyCart)
cartRouter.post("/:cid/purchase", auth, authorization('endPurchase'), createTicket)

export default cartRouter