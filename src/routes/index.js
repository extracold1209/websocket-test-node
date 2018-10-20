const router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.json({
        content: 'hello'
    });
});

module.exports = router;
