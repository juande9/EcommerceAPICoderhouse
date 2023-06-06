import { Router } from 'express';
import { getCarts, createCart, getCartById, addProduct, deleteProduct, updateQuantity, emptyCart } from '../controllers/cartController.js';
import auth from '../middleware/auth.js';
import authorization from '../middleware/authorization.js';

const cartRouter = Router()

cartRouter.get("/", getCarts)
cartRouter.post("/", auth, authorization('getCart'), createCart)
cartRouter.get("/:cid", getCartById)
cartRouter.post("/:cid/products/:pid", auth, authorization('addProductCart'), addProduct)
cartRouter.delete("/:cid/products/:pid", auth, authorization('deleteProductCart'), deleteProduct)
cartRouter.put("/:cid/products/:pid", auth, authorization('updateProductCart'), updateQuantity)
cartRouter.delete("/:cid",auth, authorization('emptyCart'), emptyCart)

export default cartRouter