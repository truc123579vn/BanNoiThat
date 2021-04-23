import { orderDetailsModel } from 'src/app/models/orderDetails.model';
export class orderModel{
    constructor(
        public  id : number ,

        public user_id: number,

        public  totalPrice : number,
        
        public  date : number ,

        public  address : number ,
        
        public  status : number,

        public orderDetails : orderDetailsModel[]
        
      )
    {}
}

