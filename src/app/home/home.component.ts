import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, HostBinding } from '@angular/core';

import { AuthService } from './../services/auth.service';
import { CompanyService } from './../services/company.service';

import { Company } from './../models/company.model';

import { CreateCompanyComponent } from '../create-company/create-company.component';

import { routeFadeStateTrigger, displayFadeStateTrigger } from '../shared/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [routeFadeStateTrigger, displayFadeStateTrigger]
})
export class HomeComponent implements OnInit {

  @HostBinding('@routeFadeState') routeAnimation = true;

  companies: Company[];

  helperDisplayForm = false;

  constructor(
    private dialog: MatDialog,
    private companyService: CompanyService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.companyService.getCompany();
    this.companyService.companySubject.subscribe(res => {
      this.companies = this.companyService.companies;
      // console.log(this.companies);
    },
      err => {
        if (this.authService.errorHandler(err) === 'Oops..Something wrong with servers...') {
          this.router.navigate(['server_down'])
        }
      })
  }

  openDialog() {
    this.dialog.open(CreateCompanyComponent);
  }
}
