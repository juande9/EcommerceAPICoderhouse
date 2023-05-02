import fs from "fs/promises"

class Cart {

    path = ``;
    autoId = 1;
    #cart = [];

    constructor() {
        this.#cart = [];
        this.path = `../db/cart.json`;
    }

    async createCart() {
        try {
            const cartFile = await fs.readFile(this.path, "utf-8")
            if (cartFile.length === 0) {
                this.#cart.push({
                    cart: [], id: this.autoId++,
                })
                await fs.writeFile(this.path, JSON.stringify(this.#cart, null, 2))
            } else {
                const cartList = JSON.parse(cartFile)
                if (cartList.length > 0) {
                    let lastCart = cartList[cartList.length - 1];
                    this.autoId = lastCart.id + 1
                }
                cartList.push({ cart: [], id: this.autoId++, })
                await fs.writeFile(this.path, JSON.stringify(cartList, null, 2))
            }
            return `Carrito creado con exito. Id: ${this.autoId - 1}`
        }
        catch (e) {
            return e
        }
    }

    async getProductsCart(idCart) {
        try {
            const cartFile = await fs.readFile(this.path, "utf-8")
            const cartList = JSON.parse(cartFile)
            let cartFound = cartList.find(cart => cart.id == idCart)

            if (!cartFound) {
                throw new Error(`No se encontro carrito con el id: ${idCart}`)
            }
            return cartFound
        }
        catch (e) {
            return e
        }
    }

    async addProduct(idCart, idProduct) {
        try {
            const cartFile = await fs.readFile(this.path, "utf-8")
            const cartList = JSON.parse(cartFile)

            // Chequea existencia de id
            const productsFile = await fs.readFile("./src/products.json", "utf-8")
            let productList = JSON.parse(productsFile)
            let validId = productList.map(p => p.id)

            if (!validId.some(id => id == idProduct)) throw new Error(`El producto con id: ${idProduct} no existe.`)

            let cartFound = await this.getProductsCart(idCart)

            if (cartFound instanceof Error) throw new Error(cartFound.message)

            cartList.find((c) => {
                if (c.id === parseInt(idCart)) {
                    const productExist = c.cart.find(e => e.product == idProduct)
                    if (productExist) {
                        productExist.quantity++
                    } else {
                        c.cart.push({ product: idProduct, quantity: 1 })
                    }
                }
            })

            await fs.writeFile(this.path, JSON.stringify(cartList, null, 2))

            return `Operación realizada correctamente en el carrito id: ${idCart} sobre el producto id: ${idProduct}`

        }
        catch (e) {
            return e
        }
    }
}

export default Cart