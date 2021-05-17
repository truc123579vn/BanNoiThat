import { Component, OnInit } from '@angular/core';
import {orderModel} from 'src/app/models/order.model';
import {OrderService} from 'src/app/services/order.service';
import { IUser } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import { isTemplateExpression } from 'typescript';
import { loadTranslations } from '@angular/localize';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  listOrder:orderModel[]=[]; 
  managers : IUser[] = [];
  customers : IUser[] = [];
  Doanhthu!:any;
  currentDate = new Date();
  page: number = 1;
  page1: number = 1;
  pageStartCustomer : number=1;
  pageStart : number=1;
  startToSearch:string="";
  endToSearch:string="";


  constructor(private service:OrderService,
     private accountService: AccountService,
     public datePipe: DatePipe,
     private toastr: ToastrService,
     ) 
  { 
  }

  ngOnInit(): void {
    this.GetOrders();  
    this.GetManagers();
    this.GetCustomers(); 
      
    
  }
  GetOrders(){ 
    this.service.getOrders().subscribe(
      (data: orderModel[]) =>{
        this.listOrder  = data;
        this.tongDoanhthu();
        console.log("xuat hien roi!!!!"+this.listOrder)
      }
    );
    
    return this.listOrder
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

  keyCustomer: string = 'userName';
  reverseCustomer: boolean = false;
  SortCustomers(key: string)
  {
    this.keyCustomer = key;
    this.reverseCustomer = !this.reverseCustomer;
  }

  search(input: any) {
    //this.proSer.getFromDb(input);
  }
  onSelect(event: any) {

  }
  tongDoanhthu(){
    this.Doanhthu=0
      this.listOrder.forEach((item: any) => {
        this.Doanhthu += item.totalPrice
        })
    console.log("Doanh thu hiện tại = "+ this.Doanhthu)  
  }

  thongkehdtheongay(startToSearch:any, endToSearch:any){
    
    if(this.startToSearch == "" || this.endToSearch==""){
      this.ngOnInit();
    }
    else{
      var format = "dd-MM-yyyy";
    var start = this.datePipe.transform(this.startToSearch, format)
    var end = this.datePipe.transform(this.endToSearch,format)
      this.service.thongkehoadontheongay(start,end).subscribe(
        data=>{
          this.listOrder  = data;
          this.toastr.success("Tìm kiếm thành công", "Thông báo thành công");

          this.tongDoanhthu();
        }
      )
      //kiem tra ngay da lay  
      // alert(start)
      // alert(end)
      console.log(this.Doanhthu)
      
    }
  
  }
  

}


