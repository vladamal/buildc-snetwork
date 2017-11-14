
(function() {

    'use strict';

    angular.module('buildc-snetwork').controller("userDetailsController", userDetailsController);

    userDetailsController.$inject = ["$stateParams", "userService"];

    function userDetailsController($stateParams, userService) {

        /* jshint validthis: true */
        var vmDetails = this;
        vmDetails.friendsOfFriends = [];

        userService.getOne($stateParams.userId).$promise
            .then(function(data){
                vmDetails.user = data;
                for(var i=0; i<vmDetails.user.populatedFriends.length; i++){
                    vmDetails.friendsOfFriends.push(vmDetails.user.populatedFriends[i].friends);
                }
                userService.getFriendsOfFriends(vmDetails.friendsOfFriends).$promise
                    .then(function(data){
                        vmDetails.friendsOfFriends = data;
                    });
            });

    }

})();