const { body } = require("express-validator");

module.exports = {
  initValidator: [
    body('customer_xid').not().isEmpty().withMessage({
      'message': 'customer_xid required'
    })
  ]
}