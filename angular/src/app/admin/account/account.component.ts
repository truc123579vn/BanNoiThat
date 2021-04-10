import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  search(input: any) {
    //this.proSer.getFromDb(input);
  }
  onSelect(event: any) {

  }
  add(){

  }
  selectForUpdate(){

  }
  update(){

  }
  deleteConForm(){

  }
  selectForDelete(){

  }
  
}
