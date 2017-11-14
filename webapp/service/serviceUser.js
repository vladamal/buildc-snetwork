
(function(){

    'use strict';

    angular.module('buildc-snetwork').factory( "userService", userService );

    userService.$inject = [ "restResourceService" ];

    function userService( restResourceService ){

        return {
            getUsers    : getUsers
        };

        function getUsers() {
            return restResourceService.resource("users").query();
        }

    }
}());