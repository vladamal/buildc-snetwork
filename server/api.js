
var express     = require('express'),
    router      = express.Router();


router.use('/users', require('./route/routeHome'));


module.exports = router;
