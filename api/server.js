require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const logger = require('./lib/logger');
const authRoutes = require('./routes/auth.routes');
const gigsRoutes = require('./routes/gigs.routes');
const walletRoutes = require('./routes/wallet.routes');
const jobsRoutes = require('./routes/jobs.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(helmet());
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: corsOrigin, credentials: true }));

// Connect DB
const connectDB = require('./config/db');
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigsRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/jobs', jobsRoutes);

// Optional webhooks
try {
  const webhooksRoutes = require('./routes/webhooks.routes');
  app.use('/api/webhooks', webhooksRoutes);
} catch (e) {}

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Serve static if enabled
if (process.env.SERVE_STATIC === 'true') {
  const publicPath = path.join(__dirname, 'public');
  if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(publicPath, 'index.html'));
    });
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
