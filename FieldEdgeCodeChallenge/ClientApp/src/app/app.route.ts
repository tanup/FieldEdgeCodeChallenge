import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CustomerComponent } from './customer/customer.component';
// import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'customer', component: CustomerComponent },
//   { path: 'edit-customer/:id', component: EditCustomerComponent },
  { path: 'customer/add', component: CustomerFormComponent },
  { path: 'customer/edit/:id', component: CustomerFormComponent },
];
