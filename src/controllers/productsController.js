import ProductManager from "../managers/ProductManager.js";

export const getProducts = async (req, res) => {
    try {
        const manager = new ProductManager();
        const params = req.query
        const products = await manager.getProducts(params);

        res.status(200).send({ status: "success", payload: products.docs, ...products, docs: undefined });
    } catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
};

export const addProduct = async (req, res) => {
    try {
        const manager = new ProductManager();

        const { title, description, price, code, stock } = req.body;

        if (!title || !description || !price || !code || !stock) throw new Error("Hay campos incompletos")

        const newProduct = await manager.addProduct(req.body);
        res.status(200).send({ status: "success", message: `${newProduct.title} cargado correctamente` });
    } catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const manager = new ProductManager();
        const { pid } = req.params;

        if (pid.length !== 24) throw new Error("El ID ingresado es inválido");

        const productFound = await manager.getProductById(pid);
        res.status(200).send({ status: "success", payload: productFound });

    } catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const manager = new ProductManager();
        const newData = req.body
        const { pid } = req.params
        if (pid.length !== 24) throw new Error("El ID ingresado es inválido");

        const productUpdated = await manager.updateProduct(pid, newData);
        res.status(200).send({ status: "success", message: "Producto modificado" })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const manager = new ProductManager();
        const { pid } = req.params
        if (pid.length !== 24) throw new Error("El ID ingresado es inválido");

        const productDeleted = await manager.deleteProduct(pid);
        res.status(200).send({ status: "success", message: `Producto ${pid} eliminado` })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const deleteAll = async (req, res) => {
    try {
        const manager = new ProductManager(); manager
        const removeList = await manager.deleteMany({ enabled: false })
        res.status(200).send({ status: "success", message: `Todos los productos fueron eliminados` })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}