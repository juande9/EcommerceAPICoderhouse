class Ticket {

    constructor(params) {
        this.id = params.id;
        this.code = params.code;
        this.purchase_datetime = params.purchase_datetime;
        this.amount = params.amount;
        this.purchaser = params.purchaser;
    }
}

export default Ticket