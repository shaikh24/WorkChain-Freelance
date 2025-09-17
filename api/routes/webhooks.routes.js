const express = require('express');
const router = express.Router();

router.post('/pi', (req, res) => {
  require('./lib/logger').info('Received PI webhook:', req.body);
  res.json({ status: 'ok' });
});

module.exports = router;
