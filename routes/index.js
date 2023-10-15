const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.contentType('application/json');
    return res.send(JSON.stringify({ 'message': 'Welcome to DressStore application.' }));
});

module.exports = router;
