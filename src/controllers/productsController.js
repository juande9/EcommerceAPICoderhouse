import ProductManager from "../managers/ProductManager.js";

export const getProducts = async (req, res) => {
    try {
        const manager = new ProductManager();
        const products = await manager.getProducts()
        res.send({ status: "success", payload: products })
    }
    catch (e) {
        res.send({ status: "error", meesage: e })
    }
}

export const addProduct = async (req, res) => {
    try {
        const manager = new ProductManager();
        const newProduct = await manager.addProduct(req.body);
        res.status(200).send({ status: "success", message: `${newProduct.title} cargado correctamente` })
    }
    catch (e) {
        res.send({ status: "error", meesage: e })
    }
}

export const getProductById = async (req, res) => {
    try {
        const manager = new ProductManager();
        const { pid } = req.params
        const productFound = await manager.getProductById(pid);
        res.status(200).send({ status: "success", payload: productFound })
    }
    catch (e) {
        res.send({ status: "error", meesage: e })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const manager = new ProductManager();
        const newData = req.body
        const { pid } = req.params
        const productUpdated = await manager.updateProduct(pid, newData);
        res.status(200).send({ status: "success", payload: productUpdated })
    }
    catch (e) {
        res.send({ status: "error", meesage: e })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const manager = new ProductManager();
        const { pid } = req.params
        const productDeleted = await manager.deleteProduct(pid);
        res.status(201).send({ status: "success", message: `Producto ${pid} eliminado` })
    }
    catch (e) {
        res.send({ status: "error", meesage: e })
    }
}

export const deleteAll = async (req, res) => {
    try {
        const manager = new ProductManager();manager
        const removeList = await manager.deleteMany({ enable: false })
        res.status(201).send({ status: "success", message: `Todos los productos fueron eliminados` })
    }
    catch (e) {
        res.send({ status: "error", meesage: e })
    }
}