import { AboutFormService } from './../../services/aboutform.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  perquisites: FormGroup;
  start: Date;

  helperStatus = 'submitted';

  constructor(
    public aboutformServie: AboutFormService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.perquisites = new FormGroup({
      company: new FormGroup({
        name: new FormControl(null, [Validators.required]),
        spocName: new FormControl(null, [Validators.required]),
        spocMobile: new FormControl(null, [Validators.required]),
        spocEmail: new FormControl(null, [Validators.required])
      }),
      it: new FormGroup({
        name: new FormControl(null, [Validators.required]),
        spocName: new FormControl(null, [Validators.required]),
        spocMobile: new FormControl(null, [Validators.required]),
        spocEmail: new FormControl(null, [Validators.required]),
        platform: new FormControl(null, [Validators.required]),
        start: new FormControl(null, [Validators.required]),
        end: new FormControl(null, [Validators.required]),
        ip: new FormControl(null, [Validators.required])
      }),
    });


    this.form = new FormGroup({
      serviceProvider: new FormGroup({
        name: new FormControl(null, [Validators.required]),
        constitution: new FormControl(null, [Validators.required]),
        entity: new FormControl('indian-entity', [Validators.required]),
        natureOfServices: new FormControl(null, [Validators.required]),
        services: new FormControl(null, [Validators.required]),
      }),
      bagic: new FormGroup({
        softwarePurchaseAgreement: new FormControl(false, [Validators.required]),
        location: new FormControl('onsite', [Validators.required]),
        confidentialInfoShare: new FormControl(false, [Validators.required]),
        sharing: new FormControl('company_is_sharing', [Validators.required]),
        inIndia: new FormControl(false, [Validators.required]),
        commercialsApproval: new FormControl(false, [Validators.required]),
      }),
      sow: new FormControl(null),
      periodOfAgreement: new FormControl(0, [Validators.required]),
      approvalFile: new FormControl(null),
      autoRenewal: new FormControl(false, [Validators.required]),
      specificConditions: new FormControl(null),
      mouDate: new FormControl(null, [Validators.required]),
      mouPeriod: new FormControl(0, [Validators.required]),
      signingAuthPartner: new FormControl(null, [Validators.required]),
      signingAuthBagic: new FormControl(null, [Validators.required]),
      agreementFile: new FormControl(null),
      otherAspects: new FormControl(null)
    });

  }


  fileUpload(event: Event) {
    const element = (event.target as HTMLInputElement).getAttribute('class');
    const file = (event.target as HTMLInputElement).files[0];
    if (element === 'approvalFile') {
      this.form.patchValue({ approvalFile: file });
      this.form.get('approvalFile').updateValueAndValidity();
    } else if (element === 'agreementFile') {
      this.form.patchValue({ agreementFile: file });
      this.form.get('agreementFile').updateValueAndValidity();
    }
  }

  onSubmit(stepper) {
    if (this.perquisites.invalid) { return; }
    stepper.next();
    if (this.form.invalid) { return; }
    this.helperStatus = 'loading';
    this.aboutformServie.storeData([this.perquisites.value, this.form.value, this.activatedRoute.snapshot.params['id']])
      .subscribe(res => {
        console.log(res);
        this.helperStatus = 'submitted';
      },
        err => {
          console.log(err);
        });
  }

  helperFnRedirect() {
    this.route.navigate(['']);
  }
}
