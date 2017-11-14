
(function() {

    'use strict';

    angular.module('buildc-snetwork').controller("userDetailsController", userDetailsController);

    userDetailsController.$inject = ["$stateParams", "userService"];

    function userDetailsController($stateParams, userService) {

        /* jshint validthis: true */
        var vmDetails = this;

        userService.getOne($stateParams.userId).$promise
            .then(function(data){
                vmDetails.user = data;
            });

    }

})();