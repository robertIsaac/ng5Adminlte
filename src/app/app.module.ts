import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';

import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { LanComponent } from './lan/lan.component';

registerLocaleData(localeAr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginComponent,
    LanComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ProductService, UserService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
