import { orderDetailsModel } from 'src/app/models/orderDetails.model';
export class orderModel{
  public id!: number ;

  public user_Id!: number;

  public totalPrice!: number;

  public dateCreated!: number ;

  public address!: number ;

  public status!: string;

  public orderDetails!: orderDetailsModel[];
    
}

