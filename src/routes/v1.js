const express = require("express");
const Router = express.Router();
const {
  initWallet,
  enableWallet,
  getWalletBalance,
  getWalletTransactions,
  depositWallet,
  withdrawalsWallet,
  disableWallet,
} = require("../controllers/wallet");
const { initValidator } = require('../validator/wallets')

/* GET users listing. */
Router.post("/init", initValidator, initWallet);
Router.post("/wallet", enableWallet);
Router.get("/wallet", getWalletBalance);
Router.get("/wallet/transactions", getWalletTransactions);
Router.post("/wallet/deposits", depositWallet);
Router.post("/wallet/withdrawals", withdrawalsWallet);
Router.patch("/wallet", disableWallet);

module.exports = Router;
