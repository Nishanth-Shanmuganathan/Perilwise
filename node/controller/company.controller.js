const ObjectId = require('mongodb').ObjectID;

const Company = require('../models/company')
const mailer = require('../emails/verification')

exports.getCompanies = (req, res, next) => {
  Company.find()
    .then(companies => {
      res.status(201).json({
        companies: companies
      })
    })
    .catch(err => {
      res.status(404).json({
        message: 'ERROR_IN_FETCHING_DATA',
        error: err
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
    mailer.companyMailer(company, response._id)
    res.status(201).json({
      data: response
    })
  })
    .catch(err => {
      res.status(422).json({
        message: 'INSERTION_FAILED',
        error: err
      })
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
        res.status(404).json({
          message: ERROR_IN_FETCHING_DATA,
          error: err
        })
      }
      res.status(201).json({
        message: 'INSERTION_SUCCESSFUL',
        data: doc
      })
    });

}


exports.showCompanyDetails = (req, res, next) => {
  const id = req.params.id;
  Company.findOne({ _id: id }).then(company => {
    res.status(200).json({
      data: company
    })
  }).catch(err => {
    res.status(404).json({
      message: 'ERROR_IN_FETCHING_DATA',
      error: err
    })
  })
}
