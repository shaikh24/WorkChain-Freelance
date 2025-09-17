/**
 * Simple seed script to create an admin user and sample gigs.
 * Usage: npm run seed
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Gig = require('./models/Gig');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  require('./lib/logger').info('Connected to DB for seeding.');

  await User.deleteMany({});
  await Gig.deleteMany({});

  const admin = new User({ name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'admin', walletBalance: 1000 });
  await admin.save();

  const seller = new User({ name: 'Seller One', email: 'seller1@example.com', password: 'password123', role: 'seller', walletBalance: 50 });
  await seller.save();

  const gigs = [
    { title: 'Logo Design', description: 'Professional logo design', pricePi: 10, seller: seller._id },
    { title: 'Web Development', description: 'Frontend + Backend', pricePi: 50, seller: seller._id },
    { title: 'Mobile App', description: 'React Native app', pricePi: 30, seller: seller._id },
  ];

  await Gig.insertMany(gigs);

  require('./lib/logger').info('Seeding done.');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
