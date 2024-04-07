const { wallets } = require("../models");
const generateAccessToken = require("../middlewares/auth");

const initService = async (body) => {
  const { customer_xid } = body;
  const checkCustomer = await wallets.findOne({
    where: {
      owned_by: customer_xid
    }
  })
  if (checkCustomer === null) {
    await wallets.create({
        owned_by: customer_xid,
      })
  }
  const token = generateAccessToken(customer_xid)
  return token
}

module.exports = {
  initService,
}