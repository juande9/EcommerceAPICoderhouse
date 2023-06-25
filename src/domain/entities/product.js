class Product {

    constructor(params) {
        this.id = params.id;
        this.title = params.title;
        this.description = params.description;
        this.price = params.price;
        this.thumbnail = params.thumbnail;
        this.code = params.code;
        this.stock = params.stock;
        this.enabled = params.enabled;
    }
}

export default Product