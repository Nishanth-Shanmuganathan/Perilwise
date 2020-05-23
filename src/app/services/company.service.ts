import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthService } from './auth.service';

import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  companySubject = new Subject<void>();
  companies = [];

  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router) { }

  public createCompany(company: Company) {
    return this.http.post<{ data: Company }>('http://localhost:3200/', company);
  }

  public getCompany() {
    this.http.get<{ companies: any }>('http://localhost:3200/')
      .pipe(map((companies) => {
        return companies.companies.map(ele => {
          return {
            companyName: ele.companyName,
            contactPersonName: ele.contactPersonName,
            contactPersonEmail: ele.contactPersonEmail,
            address: ele.address,
            city: ele.city,
            state: ele.state,
            product: ele.product,
            id: ele._id
          };
        })
      }))

      .subscribe(res => {
        this.companies = res;
        this.companySubject.next();
      },
        err => {
          if (this.authService.errorHandler(err) === 'Oops..Something wrong with servers...') {
            this.router.navigate(['server_down'])
          }
        });
  }


  getCompanyDetails(admin: boolean, id: string) {
    if (!admin) { return null }
    return this.http.get('http://localhost:3200/form/' + id);
  }
}
