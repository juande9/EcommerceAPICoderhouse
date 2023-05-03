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
        res.send({ status: "error", message: e })
    }
}

export const getCarts = async (req, res) => {
    try {
        const manager = new CartManager();
        const carts = await manager.getCarts()
        res.send({ status: "success", payload: carts })
    }
    catch (e) {
        console.log(e)
        res.send({ status: "error", meesage: e })
    }
}

export const getCartById = async (req, res) => {
    try {
        const manager = new CartManager();
        const { cid } = req.params
        const cartFound = await manager.getCartById(cid);
        console.log(cartFound)
        res.status(200).send({ status: "success", payload: cartFound })
    }
    catch (e) {
        res.send({ status: "error", meesage: e })
    }
}

export const addProduct = async (req, res) => {
    try {
        const manager = new CartManager();
        const { cid, pid } = req.params
        const cartFound = await manager.addProduct(cid, pid);
        console.log(cartFound.cart)
        res.status(200).send({ status: "success", 
        message: `Producto agregado correctamente al carrito: ${cartFound._id}`})
    }
    catch (e) {
        res.send({ status: "error", meesage: e })
    }
}
