import CartManager from "../../domain/managers/CartManager.js";
import { idValidation } from "../../domain/validations/idValidation.js";

class CartController {
    constructor() {
        this.manager = new CartManager();
        this.idValidation = idValidation;
    }

    createCart = async (req, res, next) => {
        try {
            const newCart = await this.manager.createCart();
            return res.status(200).send({ status: "success", message: `Nuevo carrito creado con éxito`, id: newCart.id });
        } catch (e) {
            next(e);
        }
    }

    getCarts = async (req, res, next) => {
        try {
            const carts = await this.manager.getCarts(req.query);
            res.status(200).send({ status: "success", payload: carts });
        } catch (e) {
            next(e);
        }
    }

    getCartById = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const validatedCartId = await this.idValidation.parseAsync(cid);
            const cartFound = await this.manager.getCartById(validatedCartId);
            res.status(200).send({ status: "success", payload: cartFound });
        } catch (e) {
            next(e);
        }
    }

    addProduct = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const validatedCartId = await this.idValidation.parseAsync(cid);
            const validatedProdId = await this.idValidation.parseAsync(pid);
            const updatedCart = await this.manager.addProduct(validatedCartId, validatedProdId);
            res.status(200).send({ status: "success", message: `Producto agregado correctamente`, payload: updatedCart });
        } catch (e) {
            next(e);
        }
    }

    deleteProduct = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const validatedCartId = await this.idValidation.parseAsync(cid);
            const validatedProdId = await this.idValidation.parseAsync(pid);
            const updatedCart = await this.manager.deleteProduct(validatedCartId, validatedProdId);
            res.status(200).send({ status: "success", message: `Producto eliminado correctamente.`, payload: updatedCart });
        } catch (e) {
            next(e);
        }
    }

    updateQuantity = async (req, res, next) => {
        try {
            const { quantity } = req.body;
            const { cid, pid } = req.params;
            const validatedCartId = await this.idValidation.parseAsync(cid);
            const validatedProdId = await this.idValidation.parseAsync(pid);
            const updatedCart = await this.manager.updateQuantity(validatedCartId, validatedProdId, quantity);
            res.status(200).send({ status: "success", message: `Cantidad modificada correctamente`, payload: updatedCart });
        } catch (e) {
            next(e);
        }
    }

    emptyCart = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const validatedCartId = await this.idValidation.parseAsync(cid);
            const emptiedCart = await this.manager.emptyCart(validatedCartId);
            res.status(200).send({ status: "success", message: `Se han eliminado los productos del carrito.` });
        } catch (e) {
            next(e);
        }
    }

    deleteCart = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const validatedCartId = await this.idValidation.parseAsync(cid);
            const productDeleted = await this.manager.deleteCart(validatedCartId);
            res.status(200).send({ status: "success", message: `Cart deleted` });
        } catch (e) {
            next(e);
        }
    }
}

export default CartController;
