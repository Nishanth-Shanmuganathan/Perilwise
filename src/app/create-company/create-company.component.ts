import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { CompanyService } from './../services/company.service';
import { Company } from './../models/company.model';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  companyForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private companyService: CompanyService) { }

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
    const company: Company = {
      companyName: this.companyForm.get('company-name').value,
      contactPersonName: this.companyForm.get('contact-person').value,
      contactPersonEmail: this.companyForm.get('contact-person-email').value,
      address: this.companyForm.value.address,
      city: this.companyForm.value.city,
      state: this.companyForm.value.state,
      product: this.companyForm.value.product,
    };
    this.companyService.createCompany(company)
      .subscribe(res => {
        this.companyForm.reset();
        this.dialog.closeAll();
      }, err => console.error(err));
  }

}
