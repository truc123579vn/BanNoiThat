export class productModel{
    [x: string]: any;
    id: number;
    name: string;
    amount: number=1;
    price: number;
    details: string;
    image: string;
    status: string;
    categoryId: number;
    qty:number=1

    constructor(id: number, name: string, amount: number, price: number, details: string, image: string, status: string, categoryId: number)
    {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.price = price;
        this.details = details;
        this.image = image;
        this.status = status;
        this.categoryId = categoryId;
    }
}
