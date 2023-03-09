const express = require('express');
const runnersController = require('../controllers/runnersController');

const router = express.Router();

router.get('/runners/:id', runnersController.getRunnerById);
router.post('/runners', runnersController.createRunner);
router.put('/runners/:id', runnersController.updateRunner);
router.delete('/runners/:id', runnersController.deleteRunner);

module.exports = router;