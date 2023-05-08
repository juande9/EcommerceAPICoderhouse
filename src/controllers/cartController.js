import CartManager from "../managers/CartManager.js";

export const createCart = async (req, res) => {
    try {
        const manager = new CartManager();
        const newCart = await manager.createCart({
            cart: [],
            enabled: true,
        }

        )
        return res.status(200).send({ status: "success", message: `Nuevo carrito creado con exito` })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const getCarts = async (req, res) => {
    try {
        const manager = new CartManager();
        const carts = await manager.getCarts()
        res.status(200).send({ status: "success", payload: carts })
    }
    catch (e) {
        console.log(e)
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const getCartById = async (req, res) => {
    try {
        const manager = new CartManager();
        const { cid } = req.params

        if (cid.length !== 24) throw new Error("El ID ingresado es inválido");
        const cartFound = await manager.getCartById(cid);
        res.status(200).send({ status: "success", payload: cartFound })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const addProduct = async (req, res) => {
    try {
        const manager = new CartManager();
        const { cid, pid } = req.params
        const cartUpdated = await manager.addProduct(cid, pid);

        res.status(200).send({
            status: "success",
            message: `Producto agregado correctamente.`
        })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const manager = new CartManager();
        const { cid, pid } = req.params
        const cartDeleted = await manager.deleteProduct(cid, pid);

        res.status(200).send({ status: "success", message: `Producto eliminado correctamente.` })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const manager = new CartManager();
        const { quantity } = req.body
        const { cid, pid } = req.params
        const newQuantity = await manager.updateQuantity(cid, pid, quantity);

        res.status(200).send({
            status: "success",
            message: `Cantidad modificada correctamente. Producto: ${newQuantity.product}. Nueva cantidad: ${quantity}`
        })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

