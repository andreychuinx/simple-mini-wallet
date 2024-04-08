const { wallets } = require('../models')

const checkWalletStatus = async (req, res, next) => {
  const { customerXid } = res.locals.customer
  const checkCustomer = await wallets.findOne({
    where: {
      owned_by: customerXid,
      status: 'enabled'
    }
  })
  if (checkCustomer === null) {
    res.status(404).send({
      status: 'fail',
      data: {
        error: 'Wallet disabled'
      }
    })
  } else {
    next()
  }
}

module.exports = {
  checkWalletStatus
}