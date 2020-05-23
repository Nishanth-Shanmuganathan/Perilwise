import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AboutFormService {

  constructor(public http: HttpClient) { }

  storeData([pre, add, id]) {
    const model = {
      basicDetails: {
        companyName: pre.company.name,
        companySpocName: pre.company.spocName,
        companySpocEmail: pre.company.spocEmail,
        companySpocMobile: pre.company.spocMobile,
        itName: pre.it.name,
        companyItName: pre.it.spocName,
        companyItEmail: pre.it.spocEmail,
        companyItMobile: pre.it.spocMobile,
        platformUsed: pre.it.platform,
        appStart: pre.it.start.toUTCString(),
        appEnd: pre.it.end.toUTCString(),
        ip: pre.it.ip
      },
      additionalDetails: {
        serviceProvider: {
          constitution: add.serviceProvider.constitution,
          entity: add.serviceProvider.entity,
          name: add.serviceProvider.name,
          natureOfServices: add.serviceProvider.natureOfServices,
          services: add.serviceProvider.services
        },
        bagic: {
          softwarePurchaseAgreement: add.bagic.softwarePurchaseAgreement,
          location: add.bagic.location,
          confidentialInfoShare: add.bagic.confidentialInfoShare,
          sharing: add.bagic.sharing,
          inIndia: add.bagic.inIndia,
          commercialsApproval: add.bagic.commercialsApproval,
        },
        sow: add.sow,
        periodOfAgreement: add.periodOfAgreement,
        approvalFile: add.approvalFile,
        autoRenewal: add.autoRenewal,
        specificConditions: add.specificConditions,
        mouDate: add.mouDate.toUTCString(),
        mouPeriod: add.mouPeriod,
        signingAuthPartner: add.signingAuthPartner,
        signingAuthBagic: add.signingAuthBagic,
        agreementFile: add.agreementFile,
        otherAspects: add.otherAspects
      }
    };
    return this.http.post('http://localhost:3200/add-details/' + id, model);
  }
}


// signingAuthBagic: "null"
// signingAuthPartner: "null"
// sow: "null"
// specificConditions: "null"
// mouDate: Wed May 20 2020 00: 00: 00 GMT + 0530(India Standard Time) { }
// mouPeriod: 0
// otherAspects: "sxdzcf"
// periodOfAgreement: 0
// bagic:
// commercialsApproval: false
// confidentialInfoShare: false
// inIndia: false
// location: "onsite"
// sharing: "company_is_sharing"
// softwarePurchaseAgreement: false
// agreementFile: File { name: "perilwise.bg.png", lastModified: 1590035195343, lastModifiedDate: Thu May 21 2020 09: 56: 35 GMT + 0530(India Standard Time), webkitRelativePath: "", size: 152017, … }
// approvalFile: File { name: "robot.jpeg", lastModified: 1590059372697, lastModifiedDate: Thu May 21 2020 16: 39: 32 GMT + 0530(India Standard Time), webkitRelativePath: "", size: 69634, … }
// autoRenewal: false
