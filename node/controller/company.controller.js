const Company = require('../models/company')
const mailer = require('../emails/verification')
const ObjectId = require('mongodb').ObjectID;
// const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');

// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key:
//         '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'
//     }
//   })
// );
exports.getCompanies = (req, res, next) => {
  Company.find()
    .then(companies => {
      res.status(201).json({
        companies: companies
      })
    })
}
exports.addCompanies = (req, res, next) => {
  const company = new Company({
    companyName: req.body.companyName,
    contactPersonName: req.body.contactPersonName,
    contactPersonEmail: req.body.contactPersonEmail,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    product: req.body.product
  });
  company.save().then(response => {
    mailer.companyMailer(company)
    res.status(201).json({
      data: company
    })
  })
    .catch(err => {
      console.log(err);
    })
}

exports.addCompanyDetails = (req, res, next) => {
  const details = req.body;
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const update = { details: details };
  Company.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false })
    .then((doc, err) => {
      if (err) {
        return err;
      }
      res.status(201).json({
        message: 'Details added successfully...',
        data: doc
      })
    });

}


