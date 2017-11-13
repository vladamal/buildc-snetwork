
(function() {

    'use strict';

    angular.module("buildc-snetwork")
        .config(["$stateProvider", "$urlRouterProvider",
            function ($stateProvider, $urlRouterProvider) {

                $stateProvider

                    .state('list', {
                        url:'/',
                        templateUrl:'components/users/usersView.html',
                        controller: 'usersController',
                        controllerAs: 'vmUsers'
                    });

                $urlRouterProvider.otherwise('/');

            }
        ]);
}());