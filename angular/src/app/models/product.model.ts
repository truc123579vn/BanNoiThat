export class productModel{
    id: number;
    name: string;
    amount: number;
    price: number;
    details: string;
    image: string;
    status: string;
    categoryId: number;

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
