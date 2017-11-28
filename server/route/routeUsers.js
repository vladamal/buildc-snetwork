
var express     = require('express'),
    router      = express.Router(),

    data        = require('../../data.json'),
    userProvider= require('../model/modelUser');


router.post('/',    postUsers);
router.get('/',     getUsers);

router.get('/:id',              getUser);
router.get('/fof/:friends',     getFriendsOfFriends);
router.get('/suggestions/:ids', getSuggestedFriends);

function postUsers(req, res) {
    userProvider.insertUsers(data, function(err, docs){
        if (err) {
            res.json(err);
        } else {
            res.json(docs.ops);
        }
    });
}
function getUsers(req, res) {
    userProvider.getUsers()
        .then(function(docs){
            res.json(docs);
        })
        .catch(function(err){
            res.json(err);
        })
}
function getUser(req, res) {
    userProvider.getUser(req.params.id)
        .then(function(doc){
            res.json(doc);
        })
        .catch(function(err){
            res.json(err);
        })
}
function getFriendsOfFriends(req, res) {
    var fofIds = req.params.friends.split(',');
    userProvider.getFriendsByIds(fofIds)
        .then(function(docs){
            res.json(docs);
        })
        .catch(function(err){
            res.json(err);
        })
}
function getSuggestedFriends(req, res) {

    var relatedFriends = req.params.ids.split(',');

    for(var i=0; i<relatedFriends.length; i++)
        relatedFriends[i] = +relatedFriends[i];

    userProvider.getSuggestedFriends(relatedFriends)
        .then(function(suggestions){
            res.json(suggestions);
        })
        .catch(function(err){
            res.json(err);
        });
}

module.exports = router;