const Job = require('../models/Job');

exports.create = async (req, res) => {
  try {
    const { title, description, category, budget, deadline, attachments } = req.body;
    const job = new Job({
      title, description, category, budget, deadline: deadline ? new Date(deadline) : null,
      attachments: (req.filesData && req.filesData.length>0) ? req.filesData : (attachments || []),
      owner: req.user._id
    });
    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const jobs = await Job.find().populate('owner','name email').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Not found' });
    if (job.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await job.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};