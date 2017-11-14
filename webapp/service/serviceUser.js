
(function(){

    'use strict';

    angular.module('buildc-snetwork').factory( "userService", userService );

    userService.$inject = [ "restResourceService" ];

    function userService( restResourceService ){

        return {
            getUsers    : getUsers,
            getOne      : getOne,
            getFriendsOfFriends : getFriendsOfFriends
        };

        function getUsers() {
            return restResourceService.resource("users").query();
        }

        function getOne(id) {
            return restResourceService.resource("users/" + id).queryOne();
        }

        function getFriendsOfFriends(friends) {
            return restResourceService.resource("users/fof/" + friends).query();
        }

    }
}());