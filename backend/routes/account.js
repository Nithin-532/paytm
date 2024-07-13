const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const router = express.Router();
const zod = require("zod");
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const id = req.userId;
  const account = await Account.findOne({ userId: id });

  res.status(200).json({ account: account.balance });
})

router.post("/transfer", authMiddleware, async (req, res) => {
  const {to, amount} = req.body;

  const session = await mongoose.startSession();

  session.startTransaction();
  const fromAccount = await Account.findOne({ userId: req.userId }).session(session);

  if (fromAccount.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance"
    })
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Invalid account" });
  }

  await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
  await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
  await session.commitTransaction();

  res.status(200).json({ message: "Transfer successful" });
})

module.exports = router;