
const express = require('express');
const router = express.Router();

const {
    Login
} = require('../controllers/adminAuth.js');

router.post('/login', Login);

module.exports = router;