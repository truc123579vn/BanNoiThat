import { UserService } from './shared/user.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms'

import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule,routingComponents } from './app-routing.module';
//import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right'
    })
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
