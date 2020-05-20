const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb+srv://Nishanth:Kavundan@5@cluster0-ggytq.mongodb.net/perilwise?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.error('Connection Failed..');
  })

const companyController = require('./controller/company.controller');
const authController = require('./controller/auth.controller');

const Company = require('./models/company')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(authController.cors);

app.get('', companyController.getCompanies)
app.post('/', companyController.addCompanies)

app.post("/auth/register", authController.register);
app.post("/auth/login", authController.register);


app.listen(3200)
console.log('listening...');
