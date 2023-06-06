import { Router } from 'express';
import { getProducts, addProduct, getProductById, updateProduct, deleteProduct } from "../controllers/productsController.js"
import auth from '../middleware/auth.js';
import authorization from '../middleware/authorization.js';

const pmRouter = Router()

pmRouter.get("/", getProducts)
pmRouter.get("/:pid", getProductById)
pmRouter.post("/", auth, authorization('addProduct'), addProduct)
pmRouter.put("/:pid", auth, authorization('updateroduct'),updateProduct)
pmRouter.delete("/:pid", auth, authorization('deleteProduct'),deleteProduct)

export default pmRouter