const { body, header } = require("express-validator");

module.exports = {
  initValidator: [
    body('customer_xid').not().isEmpty().withMessage({
      'message': 'customer_xid required'
    })
  ],
  enableWalletValidator: [
    header('Authorization').not().isEmpty().withMessage({
      'message': 'Authorization Header is missing'
    })
  ],
  depositWalletValidator: [
    body('amount').not().isEmpty().withMessage({
      'message': 'amount required'
    }),
    body('amount').isInt().toInt().withMessage({
      'message': 'amount should be a number'
    }),
    body('reference_id').not().isEmpty().withMessage({
      'message': 'reference_id required'
    })
  ],
  disableWalletValidator: [
    body('is_disabled').not().isEmpty().withMessage({
      'message': 'is_disabled required'
    }),
    body('is_disabled').isBoolean().toBoolean().withMessage({
      'message': 'is_disabled should be a true of false'
    })
  ]
}