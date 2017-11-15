
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
            userService.getFriendsOfFriends(vmDetails.friendsOfFriends).$promise
                .then(function (data) {
                    vmDetails.friendsOfFriends = data;
                    for (var j = 0; j < vmDetails.friendsOfFriends.length; j++) {
                        if ((vmDetails.friendsOfFriends[j].firstName === vmDetails.user.firstName)
                            && (vmDetails.friendsOfFriends[j].surname === vmDetails.user.surname)) {
                            vmDetails.friendsOfFriends.splice(j, 1);
                        }
                    }
                });
        }
        function getSuggestedFriends() {
            userService.getSuggestedFriends(vmDetails.user.friends).$promise
                .then(function(data){
                    vmDetails.suggestedFriends = data;
                });
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