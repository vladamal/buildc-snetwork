
var express     = require('express'),
    router      = express.Router(),

    color       = require('colors'),

    data        = require('../../data.json'),
    userProvider= require('../model/modelUser');


router.post('/', function(req, res) {
    userProvider.insertUsers(data, function(err, docs){
        if (err) {
            res.json(err);
        } else {
            res.json(docs.ops);
        }
    });
});

router.get('/', function(req, res) {
    userProvider.getUsers()
        .then(function(docs){
            res.json(docs);
        })
        .catch(function(err){
            res.json(err);
        })
});

module.exports = router;