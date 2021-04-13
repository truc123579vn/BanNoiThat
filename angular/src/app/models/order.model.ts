import { orderDetailsModel } from 'src/app/models/orderDetails.model';
export class orderModel{
    constructor(
        public  id : number ,

        public  total : number,
        
        public  date : number ,

        public  address : number ,
        
        public  status : number,

        public orderDetails : orderDetailsModel[]
        
      )
    {}
}

