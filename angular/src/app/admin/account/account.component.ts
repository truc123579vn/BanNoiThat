import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/user.service';
import { ExcelService } from 'src/app/services/excel.service';  
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { registerModel } from 'src/app/models/register.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  managers : IUser[] = [];
  customers : IUser[] = [];

  dataSaved = false;
  pageStart : number=1;
  pageStartCustomer : number=1;

  //addManagerForm: any;
  usernameToDelete : string = "";
  managerToSearch : string = "";
  customerToSearch : string = "";
  userNameUpDate=null;
  message = null;
  
  addManagerForm = new FormGroup(
    {
      UserNameAdd : new FormControl('',[Validators.required]),
      FirstNameAdd : new FormControl('',[Validators.required]),
      LastNameAdd : new FormControl('',[Validators.required]),
      PasswordAdd : new FormControl('',[Validators.required]),
    });

  updateManagerForm = new FormGroup(
    {
      UserNameUpdate : new FormControl('',[Validators.required]),
      FirstNameUpdate : new FormControl('',[Validators.required]),
      LastNameUpdate : new FormControl('',[Validators.required])
    });  


  constructor(private accountService: AccountService, private excelService: ExcelService){}

  ngOnInit(): void {
    this.GetManagers();
    this.GetCustomers();  
  }

  GetManagers()
  {
    this.accountService.getAccountsManager().subscribe((data: IUser[]) => {this.managers = data;
      console.log(this.managers);});
  }

  GetCustomers()
  {
    this.accountService.getAccountsCustomer().subscribe((data: IUser[]) => {this.customers = data;
      console.log(this.customers);});
  }
  search(input: any) {
    //this.proSer.getFromDb(input);
  }
  onSelect(event: any) {

  }

  onAddManagerFormSubmit()
  {
    let manager = new registerModel(
      this.addManagerForm.value.UserNameAdd,
      this.addManagerForm.value.FirstNameAdd,
      this.addManagerForm.value.LastNameAdd,
      this.addManagerForm.value.PasswordAdd
    );
    this.accountService.createAccountManager(manager).subscribe(
      ()=>{this.GetManagers();});
    this.addManagerForm.reset();
    
  }

  loadManagerToUpdate(username : string)
  {
      this.accountService.getAccountByUserName(username).subscribe(manager =>
        {
          this.updateManagerForm.controls['UserNameUpdate'].setValue(manager.userName);
          this.updateManagerForm.controls['FirstNameUpdate'].setValue(manager.firstName);
          this.updateManagerForm.controls['LastNameUpdate'].setValue(manager.lastName);
        });
  }

  onUpdateManagerFormSubmit()
  {
      let username : string = this.updateManagerForm.value.UserNameUpdate;
      let manager : IUser =
      {
        userName : this.updateManagerForm.value.UserNameUpdate,      
        firstName : this.updateManagerForm.value.FirstNameUpdate,
        lastName : this.updateManagerForm.value.LastNameUpdate,
        token : "",
        role : ""
      }
      this.accountService.updateAccount(manager).subscribe( () => this.GetManagers());
      this.updateManagerForm.reset();
  }

  loadManagerToDelete(username : string)
  {
      this.usernameToDelete = username;
  }
  deleteManager()
  {
      this.accountService.deleteAccount(this.usernameToDelete).subscribe( () => this.GetManagers());
  }

  SearchManagers(){
    if(this.managerToSearch == ""){
      this.ngOnInit();
    }
    else
    {
      this.managers = this.managers.filter((res) =>
        {
          return res.userName.toLowerCase().match(this.managerToSearch.toLowerCase());
          
        });
    }
  }

  SearchCustomers(){
    if(this.customerToSearch == ""){
      this.ngOnInit();
    }
    else
    {
      this.customers = this.customers.filter((res) =>
        {
          return res.userName.toLowerCase().match(this.customerToSearch.toLowerCase());         
        });
    }
  }

  key: string = 'userName';
  reverse: boolean = false;
  SortManagers(key: string)
  {
    this.key = key;
    this.reverse = !this.reverse;
  }

  keyCustomer: string = 'userName';
  reverseCustomer: boolean = false;
  SortCustomers(key: string)
  {
    this.keyCustomer = key;
    this.reverseCustomer = !this.reverseCustomer;
  }

  exportExcel(data : any):void
  {
    this.excelService.exportAsExcelFile(data, 'sample');
  }

}
