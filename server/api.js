
var express     = require('express'),
    router      = express.Router();


router.use('/', require('./route/routeHome'));


module.exports = router;
