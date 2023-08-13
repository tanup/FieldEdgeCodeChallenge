import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerId: string= '';
  customer: Customer = {
    id: '',
    salutation: '',
    initials: '',
    firstname: '',
    firstname_Ascii: '',
    gender: '',
    firstname_Country_Rank: '',
    firstname_Country_Frequency: '',
    lastname: '',
    lastname_Ascii: '',
    lastname_Country_Rank: '',
    lastname_Country_Frequency: '',
    email: '',
    password: '',
    country_Code: '',
    country_Code_Alpha: '',
    country_Name: '',
    primary_Language_Code: '',
    primary_Language: '',
    balance: 0,
    phone_Number: '',
    currency: ''
  };
  editForm: FormGroup; // Declare the editForm property

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_Number: [''],
      country_Code: [''],
      gender: [''],
      balance: ['']
    });
  }

  ngOnInit(): void {
    const customerIdParam = this.route.snapshot.paramMap.get('id');
    if (customerIdParam !== null) {
      this.customerId = customerIdParam;

      // Fetch customer details and populate the form
      this.http.get<Customer>(`/api/customer/getcustomerbyid/${this.customerId}`).subscribe(
        result => {
          this.customer = result;
          this.editForm.patchValue(this.customer);
        },
        error => {
          console.error('Error fetching customer details:', error);
        }
      );
    }
  }

  saveChanges(): void {
    // if (this.editForm.valid) {
    //   const updatedCustomer = { ...this.customer, ...this.editForm.value };
    //   this.http.put(`/api/customer/updatecustomer/${this.customerId}`, updatedCustomer).subscribe(
    //     () => {
    //       this.router.navigate(['/customer']);
    //     },
    //     error => {
    //       console.error('Error updating customer:', error);

    //       // Check if the error response contains validation errors
    //       if (error.error && error.error.errors) {
    //         const validationErrors = error.error.errors;
    //         console.error('Validation errors:', validationErrors);
    //         // You can handle the validation errors here, such as displaying them to the user
    //       }
    //     }
    //   );
    // }
    if (this.editForm.valid) {
      const updatedCustomer = { ...this.customer, ...this.editForm.value };
    
      // Replace null values with empty strings
      for (const key in updatedCustomer) {
        if (updatedCustomer.hasOwnProperty(key) && updatedCustomer[key] === null) {
          updatedCustomer[key] = '';
        }
      }
    
      this.http.put(`/api/customer/updatecustomer/${this.customerId}`, updatedCustomer).subscribe(
        () => {
          this.router.navigate(['/customer']);
        },
        error => {
          console.error('Error updating customer:', error);
    
          // Handle validation errors and replace null values with empty strings
          if (error.error && error.error.errors) {
            const validationErrors = error.error.errors;
    
            // Replace null values with empty strings in validation errors
            for (const key in validationErrors) {
              if (validationErrors.hasOwnProperty(key) && validationErrors[key][0] === `The ${key} field is required.`) {
                validationErrors[key] = [''];
              }
            }
    
            console.error('Validation errors:', validationErrors);
            // You can handle the validation errors here, such as displaying them to the user
          }
        }
      );
    }
    
  }

  cancelEdit(): void {
    this.router.navigate(['/customer']);
  }
}