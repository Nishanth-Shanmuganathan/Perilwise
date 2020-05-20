import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  companyForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.companyForm = new FormGroup({
      'company-name': new FormControl(null, Validators.required),
      'contact-person': new FormControl(null, Validators.required),
      'contact-person-email': new FormControl(null, [Validators.required, Validators.email]),
      'address': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'product': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.companyForm.invalid) { return; }
  }

}
