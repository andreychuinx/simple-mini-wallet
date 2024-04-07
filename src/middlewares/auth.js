const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_PRIVATE_KEY, JWT_ALGORITHM } = require('../config/app')

const generateAccessToken = (customerXid) => {
  const sessionId = uuidv4()
  const accessTokenPayload = {
    sessionId,
    customerXid
  }
  const token = jwt.sign(accessTokenPayload, ACCESS_TOKEN_PRIVATE_KEY, {
    algorithm: JWT_ALGORITHM
  })
  return token
}

module.exports = generateAccessToken;
