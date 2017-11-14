
(function() {

    'use strict';

    angular.module('buildc-snetwork').controller("usersController", usersController);

    usersController.$inject = ["userService"];

    function usersController(userService) {

        /* jshint validthis: true */
        var vmUsers = this;

        vmUsers.users = userService.getUsers();


    }

})();