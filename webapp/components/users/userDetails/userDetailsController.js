
(function() {

    'use strict';

    angular.module('buildc-snetwork').controller("userDetailsController", userDetailsController);

    userDetailsController.$inject = ["$stateParams", "userService"];

    function userDetailsController($stateParams, userService) {

        /* jshint validthis: true */
        var vmDetails = this;
        vmDetails.friendsOfFriends = [];
        vmDetails.suggestedFriends = [];


        function getFriendsOfFriends() {
            for (var i = 0; i < vmDetails.user.populatedFriends.length; i++) {
                vmDetails.friendsOfFriends.push(vmDetails.user.populatedFriends[i].friends);
            }
            var notIn = vmDetails.user.friends;
            notIn.push(vmDetails.user.id);

            userService.getFriendsOfFriends(vmDetails.friendsOfFriends, notIn).$promise
                .then(function(data){
                    vmDetails.friendsOfFriends = data;
                });
        }
        function getSuggestedFriends() {
            if(vmDetails.user.friends.length>1){
                userService.getSuggestedFriends(vmDetails.user.friends).$promise
                    .then(function(data){
                        vmDetails.suggestedFriends = data;

                        // Remove selected user
                        for(var j = 0; j < vmDetails.suggestedFriends.length; j++)
                            if(vmDetails.suggestedFriends[j].id === vmDetails.user.id){
                                vmDetails.suggestedFriends.splice(j, 1);
                                return;
                            }

                    });
            } else {
                vmDetails.suggestedFriends = [];
            }
        }

        function init() {
            userService.getOne($stateParams.userId).$promise
                .then(function (data) {
                    vmDetails.user = data;
                    getFriendsOfFriends();
                    if (vmDetails.user.friends.length > 1) {
                        getSuggestedFriends();
                    }
                });
        }
        init();

    }

})();