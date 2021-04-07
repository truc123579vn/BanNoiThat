
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms'

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
    //HttpClientModule,
    /* ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    }), */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
