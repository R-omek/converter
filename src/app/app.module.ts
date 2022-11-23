import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConvertationComponent } from './convertation/convertation.component';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ApiService } from './shared/services/api.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConvertationComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputNumberModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  providers: [HttpClient, ApiService, HttpParams],
  bootstrap: [AppComponent]
})
export class AppModule { }
