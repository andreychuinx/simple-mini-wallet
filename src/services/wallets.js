const { wallets, transactions, sequelize } = require("../models");
const { generateAccessToken } = require("../middlewares/auth");
const { Op } = require("sequelize");

const initService = async (body) => {
  const { customer_xid } = body;
  const checkCustomer = await wallets.findOne({
    where: {
      owned_by: customer_xid,
    },
  });
  if (checkCustomer === null) {
    await wallets.create({
      owned_by: customer_xid,
    });
  }
  const token = generateAccessToken(customer_xid);
  return token;
};

const enableWalletService = async (customerXid) => {
  const checkWallet = await wallets.findOne({
    where: {
      owned_by: customerXid,
      status: "disabled",
    },
  });
  if (checkWallet !== null) {
    const updateWallet = await wallets.update(
      {
        status: "enabled",
        balance: 0,
        enabled_at: new Date(),
      },
      {
        where: {
          owned_by: customerXid,
        },
        returning: true,
        plain: true,
      }
    );
    return updateWallet[1];
  } else {
    throw Error("Already enabled");
  }
};

const getBalance = async (customerXid) => {
  return await wallets.findOne({
    where: {
      owned_by: customerXid,
    },
  });
};

const getTransactions = async (customerXid) => {
  const getAll = await transactions.findAll({
    where: {
      [Op.or]: [{
        deposited_by: customerXid,
      }, {
        withdrawn_by: customerXid
      }],
    }
  });
  return getAll.map((dt) =>  {
    const { deposited_at, deposited_by, withdrawn_at, withdrawn_by, ...rest } = dt.dataValues

    return {
      ...rest,
      amount: Number(rest.amount),
      transacted_at: dt.deposited_at !== null ? dt.deposited_at : dt.withdrawn_at
    }
  })
};

const depositWalletService = async (customerXid, amount, referenceId) => {
  try {
    const checkWallet = await getBalance(customerXid);
    const result = await sequelize.transaction(async (t) => {
      await wallets.update(
        {
          balance: Number(amount) + Number(checkWallet.balance),
        },
        {
          where: { owned_by: customerXid },
          returning: true,
          plain: true,
          transaction: t,
        }
      );

      const transaction = await transactions.create(
        {
          deposited_by: customerXid,
          deposited_at: new Date(),
          status: "success",
          type: "deposit",
          amount: Number(amount),
          reference_id: referenceId,
        },  
        {
          transaction: t,
        }
      );

      const { withdrawn_at, withdrawn_by, ...rest } = transaction.dataValues
      return {...rest, amount: Number(rest.amount)}
    });
    return result;
  } catch (err) {
    throw Error(err);
  }
};

const withdrawalWalletService = async (customerXid, amount, referenceId) => {
  try {
    const checkWallet = await getBalance(customerXid);
    let status = "success";
    if (checkWallet.balance < Number(amount)) {
      status = "failed";
    }
    const result = await sequelize.transaction(async (t) => {
      if (status === 'success') {
        await wallets.update(
          {
            balance: Number(amount) - checkWallet.balance,
          },
          {
            where: { owned_by: customerXid },
            returning: true,
            plain: true,
            transaction: t,
          }
        );
      }

      const transaction = await transactions.create(
        {
          withdrawn_by: customerXid,
          withdrawn_at: new Date(),
          status,
          type: "withdrawal",
          amount: Number(amount),
          reference_id: referenceId,
        },
        {
          transaction: t,
        }
      );
      const { deposited_at, deposited_by, ...rest } = transaction.dataValues
      return {...rest, amount: rest.amount};
    });
    return result;
  } catch (err) {
    throw Error(err);
  }
};

const disableWalletServices = async (customerXid) => {
  const disable = await wallets.update(
    { status: "disabled" },
    {
      where: {
        owned_by: customerXid,
      },
      returning: true,
      plain:true
    }
  );
  return disable[1]
}

module.exports = {
  initService,
  enableWalletService,
  getBalance,
  getTransactions,
  depositWalletService,
  withdrawalWalletService,
};
