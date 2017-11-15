

var mongoose = require('mongoose'),
    Promise  = require('bluebird');

Promise.promisifyAll(mongoose);

var schemaUser = mongoose.Schema({
    id          : { type: Number, required: true, unique: true, trim: true },
    firstName   : { type: String, required: true, trim: true, minlength: [1, 'Firstname must have at least 14 character.'], maxlength: [42, 'Firstname must have less than 42 characters.'] },
    surname     : { type: String, required: true, trim: true, minlength: [1, 'Surname must have at least 1 character.'], maxlength: [42, 'Lastname must have less than 42 characters.'] },
    age         : { type: Number, default: null },
    gender      : { type: String, required: true, trim: true },

    friends     : [{ type : Number, default: null }]
}, { toJSON: { virtuals: true } });

schemaUser.virtual('populatedFriends', {
    ref: 'user',
    localField: 'friends',
    foreignField: 'id',
    justOne: false
});

var User = mongoose.model('user', schemaUser);


module.exports = {
    insertUsers     : insertUsers,
    getUsers        : getUsers,

    getUser         : getUser,
    getFriendsByIds : getFriendsByIds
};

function insertUsers(users, callback){
    User.collection.insert(users, callback);
}

function getUsers(){
    return User.find({}).exec();
}

function getUser(id){
    return User.findOne({id:id})
        .populate({path: 'populatedFriends', select: 'firstName surname friends'})
        .exec();
}

function getFriendsByIds(ids){
    return User.find({id: { "$in": ids}}).exec();
}