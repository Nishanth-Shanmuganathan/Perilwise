const Company = require('../models/company')

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
  company.save();
  res.status(201).json({
    message: 'Company added..',
    data: company
  })
}
