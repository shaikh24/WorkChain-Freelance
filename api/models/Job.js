const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  budget: { type: Number },
  deadline: { type: Date },
  attachments: [{ type: String }],
  status: { type: String, enum: ['open','in_progress','completed','cancelled'], default: 'open' },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);