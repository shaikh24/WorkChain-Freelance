const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { upload, uploadFilesToSupabase } = require('../middleware/upload.middleware');
const jobsController = require('../controllers/jobs.controller');

router.post('/', auth, upload.array('attachments'), uploadFilesToSupabase, jobsController.create);
router.get('/my', auth, jobsController.getMyJobs);
router.get('/', jobsController.getAll);
router.delete('/:id', auth, jobsController.remove);

module.exports = router;