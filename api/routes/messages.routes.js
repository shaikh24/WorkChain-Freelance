const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const messagesController = require('../controllers/messages.controller');

router.post('/', auth, messagesController.createMessage);
router.get('/:roomId', auth, messagesController.getMessagesByRoom);
router.post('/mark-read', auth, messagesController.markRead);

module.exports = router;
