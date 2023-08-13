import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { Customer } from './customer.model';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  public customers: Customer[] = [];
  //put below code and test
  isLoading = false;
   constructor(
     private router: Router,
     private http: HttpClient, // Inject HttpClient here
     @Inject('BASE_URL') baseUrl: string
   ) {
    this.isLoading = true;
     http.get<Customer[]>(baseUrl + 'api/customer').subscribe(
       result => {
         this.customers = result;
         this.isLoading = false;
       },
       error => {
         console.error(error);
         this.isLoading = false;
       }
     );
   }

   deleteCustomer(id: string): void {
     const deleteUrl = `/api/customer/deletecustomer/${id}`;
     this.http.delete(deleteUrl).subscribe(
       () => {
         this.customers = this.customers.filter(customer => customer.id !== id);
       },
       error => {
         console.error('Error deleting customer:', error);
       }
     );
   }

  editCustomer(id: string): void {
    // this.router.navigate(['/edit-customer', id]);
    this.router.navigate(['/customer/edit', id]);
  }

  addNewCustomer(): void {
    this.router.navigate(['/add-customer']); // Navigate to the new page for adding a customer
  }

}

