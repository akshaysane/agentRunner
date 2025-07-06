const express = require('express');
const router = express.Router();
const { generate } = require('../controllers/llmController');

router.post('/', generate);

module.exports = router;
