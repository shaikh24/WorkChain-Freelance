const mongoose = require('mongoose');

const GigSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  pricePi: { type: Number, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, default: 0 },
  reviews: [{ author: String, text: String, rating: Number, createdAt: Date }],
}, { timestamps: true });

module.exports = mongoose.model('Gig', GigSchema);
