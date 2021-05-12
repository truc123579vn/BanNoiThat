export class productModel{
    [x: string]: any;
    Id: number;
    Name: string;
    Amount: number=1;
    Price: number;
    Details: string;
    Image: string;
    Status: string;
    Category_Id: number;
    //qty:number=1

    constructor(id: number, name: string, amount: number, price: number, details: string, image: string, status: string, categoryId: number)
    {
        this.Id = id;
        this.Name = name;
        this.Amount = amount;
        this.Price = price;
        this.Details = details;
        this.Image = image;
        this.Status = status;
        this.Category_Id = categoryId;
    }
}
