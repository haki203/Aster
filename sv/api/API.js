var express = require('express');
var router = express.Router();
router.post('/', async (req, res, next) => {
    try {
        
        res.status(200).json({result: true });
    } catch (error) {
        res.status(201).json({});
    }
});
module.exports = router;
