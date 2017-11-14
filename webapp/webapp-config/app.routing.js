
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
                    })

                    .state('details', {
                        url:'/:userId',
                        templateUrl:'components/users/userDetails/userDetailsView.html',
                        controller: 'userDetailsController',
                        controllerAs: 'vmDetails'
                    });

                $urlRouterProvider.otherwise('/');

            }
        ]);
}());