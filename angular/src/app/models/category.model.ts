import { productModel } from 'src/app/models/product.model';
export interface ICategory{
    id:number;
    name:string;
    products:productModel[];
}