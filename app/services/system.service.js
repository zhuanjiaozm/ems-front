define(function(require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('system.service', []);
    ngModule.factory('systemService', ['$request', function($request) {
        return {
            // 机构管理
            getSpaceList: function(params) {
                return $request.post('/sys/space/info/child/2', params);
            },
            addOrganize: function(params) {
                return $request.post('org/update', params);
            }
        };
    }]);
    module.exports = ngModule;
});