
var express     = require('express'),
    router      = express.Router(),

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

router.get('/:id', function(req, res) {
    userProvider.getUser(req.params.id)
        .then(function(doc){
            res.json(doc);
        })
        .catch(function(err){
            res.json(err);
        })
});

router.get('/fof/:fof', function(req, res) {
    var fofIds = req.params.fof.split(',');
    userProvider.getFriendsByIds(fofIds)
        .then(function(docs){
            res.json(docs);
        })
        .catch(function(err){
            res.json(err);
        })
});

router.get('/suggestions/:ids', function(req, res) {
    var potentialSuggestions = req.params.ids.split(','),
        suggestions = [],
        match = 0;

    userProvider.getUsers()
        .then(function(docs){
            for(var i=0; i<docs.length; i++) {
                for (var j = 0; j < docs[i].friends.length; j++) {
                    for (var k = 0; k < potentialSuggestions.length; k++) {
                        if (docs[i].friends[j] == potentialSuggestions[k]) {
                            match++;
                            suggestions.push(potentialSuggestions[k]);
                        }
                    }
                }
            }
            if(match<2){
                res.json([]);
            } else {
                userProvider.getFriendsByIds(suggestions)
                    .then(function(docs){
                        res.json(docs);
                    })
                    .catch(function(err){
                        res.json(err);
                    });
            }
        })
        .catch(function(err){
            res.json(err);
        });
});

module.exports = router;