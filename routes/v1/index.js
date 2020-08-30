const express = require('express');
const authRoute = require('./auth');
const scheduleRoute = require('./schedules');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/schedules', scheduleRoute);

module.exports = router;