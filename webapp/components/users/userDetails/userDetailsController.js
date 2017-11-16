
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
                .then(function(data){
                    vmDetails.friendsOfFriends = angular.copy(data);

                    for (var j = 0; j < vmDetails.friendsOfFriends.length; j++){

                        // Remove selected user
                        if(vmDetails.friendsOfFriends[j].id === vmDetails.user.id){
                            vmDetails.friendsOfFriends.splice(j, 1);
                            j--;
                        }

                        // Remove direct friends
                        for(var k=0; k<vmDetails.user.friends.length; k++){
                            if(vmDetails.friendsOfFriends[j].id === vmDetails.user.friends[k]){
                                vmDetails.friendsOfFriends.splice(j, 1);
                            }
                        }

                    }
                });
        }
        function getSuggestedFriends() {
            if(vmDetails.user.friends.length>1){
                userService.getSuggestedFriends(vmDetails.user.friends).$promise
                    .then(function(data){
                        vmDetails.suggestedFriends = angular.copy(data);

                        // Remove selected user
                        for(var j = 0; j < vmDetails.suggestedFriends.length; j++){
                            if(vmDetails.suggestedFriends[j].id === vmDetails.user.id){
                                vmDetails.suggestedFriends.splice(j, 1);
                                j--;
                            }
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