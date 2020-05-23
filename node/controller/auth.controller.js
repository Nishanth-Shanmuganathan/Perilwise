const User = require('./../models/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = (req, res, next) => {
  let fetchedUser;

  if (req.body.password !== req.body.confirmPassword) {
    res.status(401).json({
      message: 'PASSWORD_MISMATCH'
    })
  }

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      fetchedUser = new User({
        email: req.body.email,
        password: hash,
        advertise: req.body.advertise
      })
      return fetchedUser.save()
    })
    .then(response => {
      const token = jwt.sign({ email: fetchedUser.email, id: fetchedUser._id }, 'Idhu_oru_neeelamana_string_uh_')
      res.status(201).json({
        message: 'User created..',
        data: response,
        token: token,
        admin: fetchedUser.email === 'admin@admin.com' ? true : false
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'EMAIL_ALREADY_EXISTS',
        error: err
      })
    })
}

exports.login = (req, res, next) => {

  let fetchedUser;
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "AUTHENTICATION_DENIED"
        })
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "AUTHENTICATION_DENIED"
        })
      }
      const token = jwt.sign({ email: fetchedUser.email, id: fetchedUser._id }, 'Idhu_oru_neeelamana_string_uh_')
      res.status(200).json({
        token: token,
        admin: fetchedUser.email === 'admin@admin.com' ? true : false
      })
    })
    .catch(err => {
      res.status(401).json({
        message: "AUTHENTICATION_DENIED"
      })
    })
}

exports.tokenValidator = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'Idhu_oru_neeelamana_string_uh_')
    next()
  } catch {
    res.status(401).json({
      message: 'AUTHE.............',
      error: 'Token invalid'
    })
  }
}

exports.cors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
}

exports.wildcard = (req, res, next) => {
  res.status(307).redirect('404_page');
}
