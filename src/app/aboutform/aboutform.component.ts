import { Subject } from 'rxjs';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CompanyService } from './../services/company.service';
import { routeFadeStateTrigger } from '../shared/animations';

@Component({
  selector: 'app-aboutform',
  templateUrl: './aboutform.component.html',
  styleUrls: ['./aboutform.component.css'],
  animations: [routeFadeStateTrigger]
})
export class AboutformComponent implements OnInit {

  @HostBinding('@routeFadeState') routeAnimation = true;

  admin = false;
  formData = new Subject<any>();

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.admin = this.authService.admin;
    if (this.admin) {
      this.companyService.getCompanyDetails(this.admin, this.activatedRoute.snapshot.params.id)
        .subscribe(res => {
          this.formData.next(res);
        },
          err => {
            if (this.authService.errorHandler(err) === 'Oops..Something wrong with servers...') {
              this.router.navigate(['server_down'])
            }
          })
    }
  }

}
