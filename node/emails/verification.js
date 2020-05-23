const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

exports.autheticationMailer = (company) => {
  sgMail.send({
    to: company.contactPersonEmail,
    from: 'nishanth.mailer@gmail.com',
    subject: 'First creation',
    text: 'Vandhuruchaa'
  })
}
exports.companyMailer = (company) => {
  sgMail.send({
    to: company.contactPersonEmail,
    from: 'nishanth.mailer@gmail.com',
    subject: 'Perilwise Insuretech registration form link',
    text: `Hi ${company.contactPersonName},
               ${company.companyName} had made a request to tie-up with Perilwise Insuretech.
               Please do fill the following form details to complete the registration process.
               Thank you,

               With regards,
               Dev Team(Perilwise Insuretech)`
  })
    .then(res => {
      console.log('Mail sent');
    })
    .catch(err => {
      console.log(err);
    })
}
