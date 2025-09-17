const express = require('express');
const router = express.Router();
const gigsController = require('../controllers/gigs.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', gigsController.getAll);
router.post('/', auth, gigsController.create);
router.get('/:id', gigsController.getOne);
router.put('/:id', auth, gigsController.update);
router.delete('/:id', auth, gigsController.remove);

module.exports = router;
