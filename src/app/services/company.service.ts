import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  companySubject = new Subject<void>();
  companies = [];

  constructor(private http: HttpClient) { }

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
        err => console.log(err));
  }
}
