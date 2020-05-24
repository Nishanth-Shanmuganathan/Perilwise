const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

const env = require('./env');

const app = express();

mongoose.connect(env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log('Connection Successful...');
  })
  .catch((err) => {
    res.status(500).json({
      message: 'DATABASE_CONNECTION_FAILED',
      error: err
    });
  })

const companyController = require('./controller/company.controller');
const authController = require('./controller/auth.controller');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(authController.cors);

app.get('', authController.tokenValidator, companyController.getCompanies)
app.post('/', authController.tokenValidator, companyController.addCompanies)

app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);

app.get('/form/:id', companyController.showCompanyDetails);
app.post('/add-details/:id', companyController.addCompanyDetails);

app.get('/*', authController.wildcard);

app.listen(3200)
