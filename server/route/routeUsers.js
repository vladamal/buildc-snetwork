
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
    var relatedFriends = req.params.ids.split(','),
        suggestedFriends = [];

    userProvider.getUsers()
        .then(function(docs){
            for(var i=0; i<docs.length; i++) {
                var match = 0;
                for (var j = 0; j < docs[i].friends.length; j++) {
                    for (var k = 0; k < relatedFriends.length; k++) {
                        if (docs[i].friends[j] == relatedFriends[k]) {
                            ++match;
                            if(match>1){
                                if(suggestedFriends.length>0){
                                    for(var l=0; l<suggestedFriends.length; l++){
                                        if(suggestedFriends[l].id === docs[i].id){
                                            // Duplicate
                                        }else{
                                            suggestedFriends.push(docs[i]);
                                            break;
                                        }
                                    }
                                } else {
                                    suggestedFriends.push(docs[i]);
                                }
                                break;
                            }
                        }
                    }
                }
            }
            res.json(suggestedFriends);
        })
        .catch(function(err){
            res.json(err);
        });
});

module.exports = router;