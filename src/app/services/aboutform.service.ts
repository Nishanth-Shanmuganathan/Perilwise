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
        appStart: pre.it.start,
        appEnd: pre.it.end,
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
        mouDate: add.mouDate,
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
