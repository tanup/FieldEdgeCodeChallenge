// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { RouterModule } from '@angular/router';

// import { AppComponent } from './app.component';
// import { NavMenuComponent } from './nav-menu/nav-menu.component';
// import { HomeComponent } from './home/home.component';
// import { CounterComponent } from './counter/counter.component';
// import { FetchDataComponent } from './fetch-data/fetch-data.component';
// import { CustomerComponent } from './customer/customer.component';
// import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
// import { ReactiveFormsModule } from '@angular/forms';
// @NgModule({
//   declarations: [
//     AppComponent,
//     NavMenuComponent,
//     HomeComponent,
//     CounterComponent,
//     FetchDataComponent,
//     CustomerComponent,
//     EditCustomerComponent
//   ],
//   imports: [
//     BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
//     HttpClientModule,
//     FormsModule,
//     ReactiveFormsModule,
//     RouterModule.forRoot([
//       { path: '', component: HomeComponent, pathMatch: 'full' },
//       { path: 'counter', component: CounterComponent },
//       { path: 'fetch-data', component: FetchDataComponent },
//       { path: 'customer', component: CustomerComponent },
//       { path: 'edit-customer/:id', component: EditCustomerComponent },
//     ])
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CustomerComponent } from './customer/customer.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from './app.route';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CustomerComponent,
    EditCustomerComponent,
    CustomerFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes) // Use the imported appRoutes here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

