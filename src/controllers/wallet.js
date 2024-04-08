const { validationResult } = require("express-validator");
const {
  initService,
  enableWalletService,
  getBalance,
  getTransactions,
  depositWalletService,
  withdrawalWalletService,
  disableWalletServices,
} = require("../services/wallets");
const { wallets } = require("../models");

const initWallet = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const token = await initService(req.body);
    return res.status(200).send({
      status: "success",
      data: {
        token,
      },
    });
  }
  res.status(400).send({
    status: "fail",
    data: {
      error: errors.array()[0].msg.message,
    },
  });
};

const enableWallet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { customerXid } = res.locals.customer;
      const enableWallet = await enableWalletService(customerXid);
      return res.status(201).send({
        status: "success",
        data: {
          wallet: enableWallet,
        },
      });
    }
    return res.status(400).send({
      status: "fail",
      data: {
        error: errors.array()[0].message.msg,
      },
    });
  } catch (err) {
    return res.status(400).send({
      status: "fail",
      data: {
        error: err.message,
      },
    });
  }
};
const getWalletBalance = async (req, res) => {
  const { customerXid } = res.locals.customer;
  const findBalance = await getBalance(customerXid);
  res.status(200).send({
    status: "success",
    data: {
      wallet: findBalance,
    },
  });
};
const getWalletTransactions = async (req, res) => {
  const { customerXid } = res.locals.customer;
  const transactions = await getTransactions(customerXid);
  res.status(200).send({
    status: "success",
    data: {
      transactions,
    },
  });
};
const depositWallet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { amount, reference_id } = req.body;
      const { customerXid } = res.locals.customer;
      const deposit = await depositWalletService(
        customerXid,
        amount,
        reference_id
      );
      return res.status(201).send({
        status: "success",
        data: {
          deposit,
        },
      });
    }
    res.status(404).send({
      status: "fail",
      data: {
        error: errors.array()[0].msg.message,
      },
    });
  } catch (err) {
    return res.status(400).send({
      status: "fail",
      data: {
        error: err.message,
      },
    });
  }
};
const withdrawalsWallet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { amount, reference_id } = req.body;
      const { customerXid } = res.locals.customer;
      const withdrawal = await withdrawalWalletService(
        customerXid,
        amount,
        reference_id
      );
      return res.status(201).send({
        status: "success",
        data: {
          withdrawal,
        },
      });
    }
    res.status(404).send({
      status: "fail",
      data: {
        error: errors.array()[0].msg.message,
      },
    });
  } catch (err) {
    return res.status(400).send({
      status: "fail",
      data: {
        error: err.message,
      },
    });
  }
};
const disableWallet = async (req, res) => {
  if (req.body.is_disabled === "true") {
    const { customerXid } = res.locals.customer;
    const query = await disableWalletServices(customerXid);
    return res.status(200).send({
      status: "success",
      data: {
        wallet: query,
      },
    });
  } else {
    return res.status(404).send({
      status: "fail",
      data: {
        error: "is_disabled should be true"
      }
    })
  }
};

module.exports = {
  initWallet,
  enableWallet,
  getWalletBalance,
  getWalletTransactions,
  depositWallet,
  withdrawalsWallet,
  disableWallet,
};
