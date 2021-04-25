export class registerModel
{
    UserName : string;
    FirstName : string;
    LastName : string;
    Password : string;

    constructor(UserName:string, FirstName:string, LastName:string, Password:string)
    {
        this.UserName = UserName;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Password = Password;
    }
}