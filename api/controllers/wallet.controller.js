const Transaction = require('../models/Transaction');
const User = require('../models/User');

exports.getWallet = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('walletBalance');
    res.json({ balance: user.walletBalance });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deposit = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
    const tx = new Transaction({ user: req.user._id, type: 'deposit', amount, status: 'pending' });
    await tx.save();
    tx.status = 'completed';
    await tx.save();
    req.user.walletBalance += amount;
    await req.user.save();
    res.json({ message: 'Deposit successful (simulated)', balance: req.user.walletBalance, tx });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
    if (req.user.walletBalance < amount) return res.status(400).json({ message: 'Insufficient balance' });
    const tx = new Transaction({ user: req.user._id, type: 'withdraw', amount, status: 'completed' });
    await tx.save();
    req.user.walletBalance -= amount;
    await req.user.save();
    res.json({ message: 'Withdraw successful', balance: req.user.walletBalance, tx });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.escrow = async (req, res) => {
  try {
    const { amount, gigId, toUserId } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
    const tx = new Transaction({ user: req.user._id, type: 'escrow', amount, status: 'pending', meta: { gigId, toUserId } });
    await tx.save();
    if (req.user.walletBalance < amount) return res.status(400).json({ message: 'Insufficient balance' });
    req.user.walletBalance -= amount;
    await req.user.save();
    res.json({ message: 'Escrow created', tx, balance: req.user.walletBalance });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getTransactions = async (req, res) => {
  try {
    const txs = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(100);
    res.json({ transactions: txs });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
