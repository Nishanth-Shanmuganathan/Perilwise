import { Company } from './../models/company.model';
import { CompanyService } from './../services/company.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCompanyComponent } from '../create-company/create-company.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  companies: Company[];

  helperDisplayForm = false;

  constructor(
    private dialog: MatDialog,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.companyService.getCompany();
    this.companyService.companySubject.subscribe(res => {
      this.companies = this.companyService.companies;
    })
  }

  openDialog() {
    this.dialog.open(CreateCompanyComponent);
  }
}
