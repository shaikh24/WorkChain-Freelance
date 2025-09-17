const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['deposit','withdraw','payment'], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending','completed','failed'], default: 'completed' },
  meta: { type: Object },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
