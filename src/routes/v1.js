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
const { initValidator, enableWalletValidator, depositWalletValidator, disableWalletValidator } = require('../validator/wallets');
const { verifyAccessToken } = require("../middlewares/auth");
const { checkWalletStatus } = require("../middlewares/wallet");

/* GET users listing. */
Router.post("/init", initValidator, initWallet);
Router.post("/wallet", verifyAccessToken, enableWallet);
Router.get("/wallet", verifyAccessToken, checkWalletStatus, getWalletBalance);
Router.get("/wallet/transactions", verifyAccessToken, checkWalletStatus, getWalletTransactions);
Router.post("/wallet/deposits", verifyAccessToken, checkWalletStatus, depositWalletValidator, depositWallet);
Router.post("/wallet/withdrawals", verifyAccessToken, checkWalletStatus, depositWalletValidator, withdrawalsWallet);
Router.patch("/wallet", verifyAccessToken, checkWalletStatus, disableWalletValidator, disableWallet);

module.exports = Router;
