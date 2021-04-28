export class orderDetailsModel {
    constructor(
        public OrderId: number,

        public productId: number,

        public productName: string,

        public amount: number,

        public price: number,
    ) { }
}