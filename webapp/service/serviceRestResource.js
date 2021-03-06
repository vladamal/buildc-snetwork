

(function(){

    'use strict';

    angular.module('buildc-snetwork').factory("restResourceService",restService);

    restService.$inject = ["$resource", "mainConfig"];

    function restService($resource, mainConfig){

        return {
            resource: resource
        };

        function resource(res){
            return $resource(mainConfig.appBaseURL + res+'/:id', { id: '@_id' }, {
                query: {
                    method: 'GET',
                    isArray: true
                },
                queryOne: {
                    method: 'GET',
                    isArray: false
                }
            });
        }
    }

}());