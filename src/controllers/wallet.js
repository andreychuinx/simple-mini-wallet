const { validationResult } = require("express-validator");
const { wallets } = require("../models");
const { initService } = require("../services/wallets");

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
  res.status(200).send({
    status: "success",
    data: "ok",
  });
};
const getWalletBalance = async (req, res) => {
  res.status(200).send({
    status: "success",
    data: "ok",
  });
};
const getWalletTransactions = async (req, res) => {
  res.status(200).send({
    status: "success",
    data: "ok",
  });
};
const depositWallet = async (req, res) => {
  res.status(200).send({
    status: "success",
    data: "ok",
  });
};
const withdrawalsWallet = async (req, res) => {
  res.status(200).send({
    status: "success",
    data: "ok",
  });
};
const disableWallet = async (req, res) => {
  res.status(200).send({
    status: "success",
    data: "ok",
  });
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
