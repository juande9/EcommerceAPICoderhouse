class Ticket {

    constructor(params) {
        this.id = params.id;
        this.code = params.code;
        this.purchaseDatetime = params.purchaseDatetime;
        this.products = params.products;
        this.amount = params.amount;
        this.purchaser = params.purchaser;
    }
}

export default Ticket