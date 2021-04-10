import { orderDetailsModel } from 'src/app/models/OrderDetails';
export class orderModel{
    constructor(
        public  Id : number ,

        public  Total : number,
        
        public  Date : number ,

        public  Address : number ,
        
        public  Status : number,
        
        public orderDetail: orderDetailsModel[])
    {}
}

