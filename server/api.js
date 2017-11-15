
var express     = require('express'),
    router      = express.Router();


router.use('/users', require('./route/routeUsers'));


module.exports = router;
