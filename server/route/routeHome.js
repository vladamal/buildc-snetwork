
var express     = require('express'),
    router      = express.Router(),

    color       = require('colors');


router.get('/', function(req, res) {
    console.log(' route home test '.bgCyan);
    res.send(' route home test ');
});

module.exports = router;