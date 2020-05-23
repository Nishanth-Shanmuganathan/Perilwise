const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

exports.autheticationMailer = (company) => {
  sgMail.send({
    to: company.contactPersonEmail,
    from: 'nishanth.mailer@gmail.com',
    subject: 'Authentication Mail',
    text: 'Click here to authenticate your account...'
  })
}
exports.companyMailer = (company, id) => {

  sgMail.send({
    to: company.contactPersonEmail,
    from: 'nishanth.mailer@gmail.com',
    subject: 'Perilwise Insuretech registration form link',
    html: '<h2>Hi ' + company.contactPersonName + '</h2><p>' + company.companyName + ' had made a request to tie-up with Perilwise Insuretech.Please do fill the <a href=http://localhost:4200/form/' + id + '>form</a> to complete the registration process.</p><p>Thank you,<br/>With regards,<br/>Dev Team<small>(Perilwise Insuretech)</small></p>',

  })
    .then(res => {
      console.log('Mail sent');
    })
    .catch(err => {
      console.log(err);
    })
}
