import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AboutformComponent } from './../aboutform.component';
import { MessageComponent } from './../../message/message.component';

import { AuthService } from './../../services/auth.service';
import { AboutFormService } from './../../services/aboutform.service';

import { displayFadeStateTrigger } from 'src/app/shared/animations';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  animations: [displayFadeStateTrigger]
})
export class FormComponent implements OnInit {
  fetchedData;
  form: FormGroup;
  perquisites: FormGroup;
  start: Date;

  helperStatus = 'pristine';
  helperFormHide = false;

  constructor(
    public aboutformService: AboutFormService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private aboutform: AboutformComponent,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.aboutform.formData.subscribe(data => {
      if (data.data.details === null && this.authService) {
        this.helperFormHide = true;
        this.dialog.open(MessageComponent, { disableClose: true });
      } else {

        this.fetchedData = data;
        this.patchData();
      }

    })

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
      // approvalFile: new FormControl(null),
      autoRenewal: new FormControl(false, [Validators.required]),
      specificConditions: new FormControl(null),
      mouDate: new FormControl(null, [Validators.required]),
      mouPeriod: new FormControl(0, [Validators.required]),
      signingAuthPartner: new FormControl(null, [Validators.required]),
      signingAuthBagic: new FormControl(null, [Validators.required]),
      // agreementFile: new FormControl(null),
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

  onSubmitOne(stepper) {
    if (this.perquisites.invalid) { return; }
    stepper.next();
  }

  onSubmit() {
    if (this.perquisites.invalid) { return; }
    if (this.form.invalid) { return; }
    this.helperStatus = 'loading';
    this.aboutformService.storeData([this.perquisites.value, this.form.value, this.activatedRoute.snapshot.params['id']])
      .subscribe(res => {
        // console.log(res);
        this.helperStatus = 'submitted';
      },
        err => {
          // console.log(err);
        });
  }

  patchData() {
    // console.log(this.fetchedData);
    this.perquisites.setValue({
      company: {
        name: this.fetchedData.data.details.basicDetails.companyName,
        spocName: this.fetchedData.data.details.basicDetails.companySpocName,
        spocMobile: this.fetchedData.data.details.basicDetails.companySpocMobile,
        spocEmail: this.fetchedData.data.details.basicDetails.companySpocEmail,
      },
      it: {
        name: this.fetchedData.data.details.basicDetails.itName,
        spocName: this.fetchedData.data.details.basicDetails.companyItName,
        spocMobile: this.fetchedData.data.details.basicDetails.companyItMobile,
        spocEmail: this.fetchedData.data.details.basicDetails.companyItEmail,
        platform: this.fetchedData.data.details.basicDetails.platformUsed,
        start: this.fetchedData.data.details.basicDetails.appStart,
        end: this.fetchedData.data.details.basicDetails.appEnd,
        ip: this.fetchedData.data.details.basicDetails.ip,
      }
    });
    this.form.setValue({
      serviceProvider: {
        name: this.fetchedData.data.details.additionalDetails.serviceProvider.name,
        constitution: this.fetchedData.data.details.additionalDetails.serviceProvider.constitution,
        entity: this.fetchedData.data.details.additionalDetails.serviceProvider.entity,
        natureOfServices: this.fetchedData.data.details.additionalDetails.serviceProvider.natureOfServices,
        services: this.fetchedData.data.details.additionalDetails.serviceProvider.services,
      },
      bagic: {
        softwarePurchaseAgreement: this.fetchedData.data.details.additionalDetails.bagic.softwarePurchaseAgreement,
        location: this.fetchedData.data.details.additionalDetails.bagic.location,
        confidentialInfoShare: this.fetchedData.data.details.additionalDetails.bagic.confidentialInfoShare,
        sharing: this.fetchedData.data.details.additionalDetails.bagic.sharing,
        inIndia: this.fetchedData.data.details.additionalDetails.bagic.inIndia,
        commercialsApproval: this.fetchedData.data.details.additionalDetails.bagic.commercialsApproval
      },
      sow: this.fetchedData.data.details.additionalDetails.sow,
      periodOfAgreement: this.fetchedData.data.details.additionalDetails.periodOfAgreement,
      // approvalFile: this.fetchedData.data.details.additionalDetails.approvalFile || '',
      autoRenewal: this.fetchedData.data.details.additionalDetails.autoRenewal,
      specificConditions: this.fetchedData.data.details.additionalDetails.specificConditions,
      mouDate: this.fetchedData.data.details.additionalDetails.mouDate,
      mouPeriod: this.fetchedData.data.details.additionalDetails.mouPeriod,
      signingAuthPartner: this.fetchedData.data.details.additionalDetails.signingAuthPartner,
      signingAuthBagic: this.fetchedData.data.details.additionalDetails.signingAuthBagic,
      // agreementFile: this.fetchedData.data.details.additionalDetails.agreementFile || '',
      otherAspects: this.fetchedData.data.details.additionalDetails.otherAspects
    })
  }

  helperFnRedirect() {
    this.route.navigate(['']);
  }


}

// dditionalDetails:
// agreementFile: null
// approvalFile: null
// autoRenewal: true
// mouDate: "2020-05-18T18:30:00.000Z"
// mouPeriod: 2
// otherAspects: "Yeahh yeaahh"
// periodOfAgreement: 2
// signingAuthBagic: "Ashwanth"
// signingAuthPartner: "Nishanth"
// sow: "Yes..yesss"
// specificConditions: "No i m not
