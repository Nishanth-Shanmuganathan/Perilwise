const mongoose = require('mongoose')

const BasicDetails = {
  companyName: {
    type: String,
    required: true
  },
  companySpocName: {
    type: String,
    required: true
  },
  companySpocEmail: {
    type: String,
    required: true
  },
  companySpocMobile: {
    type: Number,
    required: true
  },
  itName: {
    type: String,
    required: true
  },
  companyItName: {
    type: String,
    required: true
  },
  companyItEmail: {
    type: String,
    required: true
  },
  companyItMobile: {
    type: Number,
    required: true
  },
  platformUsed: {
    type: String,
    required: true
  },
  appStart: {
    type: String,
    required: true
  },
  appEnd: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
}

const ServiceProvider = {
  constitution: {
    type: String,
    required: true
  },
  entity: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  natureOfServices: {
    type: String,
    required: true
  },
  services: {
    type: String,
    required: true
  },
};

const Bagic = {
  softwarePurchaseAgreement: {
    type: Boolean,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  confidentialInfoShare: {
    type: Boolean,
    required: true
  },
  sharing: {
    type: String,
    required: true
  },
  inIndia: {
    type: Boolean,
    required: true
  },
  commercialsApproval: {
    type: Boolean,
    required: true
  },
}

const AdditionalDetails = {
  serviceProvider: {
    type: ServiceProvider,
    required: true
  },
  bagic: {
    type: Bagic,
    required: true
  },
  sow: {
    type: String,
    required: true
  },
  periodOfAgreement: {
    type: Number,
    required: true
  },
  approvalFile: {
    type: String
  },
  autoRenewal: false,
  specificConditions: {
    type: String,
    required: true
  },
  mouDate: {
    type: String,
    required: true
  },
  mouPeriod: {
    type: Number,
    required: true
  },
  signingAuthPartner: {
    type: String,
    required: true
  },
  signingAuthBagic: {
    type: String,
    required: true
  },
  agreementFile: {
    type: String
  },
  otherAspects: {
    type: String,
    required: true
  },
}


const Details = {
  basicDetails: {
    type: BasicDetails,
    required: true
  },
  additionalDetails: {
    type: AdditionalDetails,
    required: true
  }
}
const companySchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  contactPersonName: {
    type: String,
    required: true
  },
  contactPersonEmail: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  details: {
    type: Details,
    default: null
  }
})

module.exports = mongoose.model('Company', companySchema);

