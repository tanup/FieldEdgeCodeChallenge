import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customerForm!: FormGroup;
  isEditing: boolean = false;
  customerId: string;
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
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerId = '';
  }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salutation: [''],
      initials: [''],
      gender: [''],
      country_Code: [''],
      country_Code_Alpha: [''],
      country_Name: [''],
      primary_Language_Code: [''],
      primary_Language: [''],
      balance: [0],
      phone_Number: [''],
      currency: ['']
    });

    const customerIdParam = this.route.snapshot.paramMap.get('id');
    if (customerIdParam && customerIdParam != null) {
      this.isEditing = true;
      this.customerId = customerIdParam;
      this.loadCustomerDetails();
    } else {
      this.customerId = ''; // Assign an empty string when customerId is null
    }
  }

  // loadCustomerDetails(): void {
  //   this.http.get<Customer>(`/api/customer/getcustomerbyid/${this.customerId}`).subscribe(
  //     (customer) => {
  //       this.customerForm.patchValue(customer);
  //     },
  //     (error) => {
  //       console.error('Error loading customer details:', error);
  //     }
  //   );
  // }
  loadCustomerDetails(): void {
    this.http.get<Customer>(`/api/customer/GetCustomerById/${this.customerId}`).subscribe(
      (result) => {
        // for (const key in customer) {
        //   if (customer.hasOwnProperty(key) && customer[key] === null) {
        //     customer[key] = '';
        //   }
        // }
       // this.customerForm.patchValue(customer);
       this.customer = result;
       this.customerForm.patchValue(this.customer);
      },
      (error) => {
        console.error('Error loading customer details:', error);
      }
    );
  }
  

  submitForm(): void {
    if (this.customerForm.valid) {
      const updatedCustomer = { ...this.customer, ...this.customerForm.value };
      const formData = updatedCustomer;
        // Replace null values with empty strings
        for (const key in formData) {
          if (formData.hasOwnProperty(key) && formData[key] === null) {
            formData[key] = '';
          }
        }
      if (this.isEditing) {
        this.updateCustomer(updatedCustomer);
      } else {
        this.addCustomer(updatedCustomer);
      }
    } else {
      this.markFormFieldsAsTouched();
    }
  }

  markFormFieldsAsTouched(): void {
    Object.keys(this.customerForm.controls).forEach((field) => {
      const control = this.customerForm.get(field);
      control?.markAsTouched();
    });
  }

  updateCustomer(customer: Customer): void {
    this.http.put(`/api/customer/updatecustomer/${this.customerId}`, customer).subscribe(
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

  addCustomer(customer: Customer): void {
    this.http.post('/api/customer/createcustomer', customer).subscribe(
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

  cancelEdit(): void {
    this.router.navigate(['/customer']);
  }

  isFieldInvalid(fieldName: string): boolean {
    let isInValid =false;
    const control = this.customerForm.get(fieldName);
    if(control) {
      isInValid = control?.invalid && (control?.touched || control?.dirty);
    } else {
      return isInValid;
    }
    return isInValid;
  }
  
}
