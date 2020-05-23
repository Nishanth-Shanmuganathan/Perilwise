import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from './../services/auth.service';

import { Company } from './../models/company.model';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css']
})
export class CompanyCardComponent implements OnInit {

  @Input() company: Company;
  admin = false;

  constructor(
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.admin = this.authService.admin;
  }

  openSnackBar() {
    this.snackbar.open('Oops.. Functionality not yet added...', 'Dismiss', { duration: 2000 });
  }
}
