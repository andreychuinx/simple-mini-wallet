const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_PRIVATE_KEY, JWT_ALGORITHM } = require("../config/app");
const { validationResult } = require("express-validator");

const generateAccessToken = (customerXid) => {
  const sessionId = uuidv4();
  const accessTokenPayload = {
    sessionId,
    customerXid,
  };
  const token = jwt.sign(accessTokenPayload, ACCESS_TOKEN_PRIVATE_KEY, {
    algorithm: JWT_ALGORITHM,
  });
  return token;
};

const verifyAccessToken = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, ACCESS_TOKEN_PRIVATE_KEY, {
      algorithms: JWT_ALGORITHM,
    });
    if (decoded) {
      res.locals.customer = decoded;
      return next();
    }
  }
  return res.status(401).send({
    status: "fail",
    data: {
      error: errors.array()[0].msg.message
    },
  });
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
