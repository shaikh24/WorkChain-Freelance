const Gig = require('../models/Gig');

exports.getAll = async (req, res) => {
  try {
    const gigs = await Gig.find().populate('seller','name email');
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, description, pricePi } = req.body;
    const gig = new Gig({ title, description, pricePi, seller: req.user._id });
    await gig.save();
    res.status(201).json(gig);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('seller','name email');
    if (!gig) return res.status(404).json({ message: 'Not found' });
    res.json(gig);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: 'Not found' });
    if (gig.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    Object.assign(gig, req.body);
    await gig.save();
    res.json(gig);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: 'Not found' });
    if (gig.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await gig.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
