exports.register = (req, res, next) => {
  const user = req.body;
  console.log(user);
  res.status(201).json({
    message: 'Registration successful..'
  });
}

exports.login = (req, res, next) => {
  const user = req.body;
  console.log(user);
  res.status(201).json({
    message: 'Login successful..'
  });
}

exports.cors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
}
