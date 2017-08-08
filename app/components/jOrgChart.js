'use strict';
define(function (require, exports, module) {
    var angular = require('angular');

    var ngModule = angular.module('jOrgChart', []);

    ngModule.directive('jOrgChart', ['$template','$templateCache','$compile', function ($template,$templateCache,$compile) {
        return {
            restrict: 'EA',
            templateUrl: $template('template/jOrgChart'),
            replace: true,
            scope: {
                list: '='
            },
            link: function (scope, element, attrs) {
                scope.objList = {};
                var currntNode={};
                function reload(){
                    
                    $('.jOrgChart').append('<ul>' + foo(scope.list) + '</ul>');
                    $('.jOrgChart ul').jOrgChart({
                        chartElement: '#chart',
                        dragAndDrop: true
                    });
                }
                reload();



                function foo(obj) {
                    scope.objList[obj.spaceId] = obj;
                    var str = '';
                    var innerString = '<li  class="nodeLi"><i class="fa fa-cog nodeIcon" aria-hidden="true" data-nodeId="' + obj.spaceId + '"></i>';
                    str += innerString + obj.spaceName;
                    if (obj.list) {
                        str += '<ul>';
                        for (var i in obj.list) {
                            str += foo(obj.list[i]);
                        }
                        str += '</ul>';
                    }
                    str += $templateCache.get('node.html');
                    
                    return str;
                }
                

                //准备删除
                $('.fa.delete').on('click', function () {
                    $('.popover').hide();
                    $(this).parents('.nodeLi').find('.popover').toggle();
                    currntNode = scope.objList[$(this).parents('.nodeLi').find('.nodeIcon').attr('data-nodeId')];
                });
                //取消删除
                $('.btn-cancel').on('click',function(){
                    $('.popover').hide();
                })
                //确认删除
                $('.btn-delete').on('click',function(){
                    $('.popover').hide();
                    console.log('正在删除ID是：' + currntNode.spaceName + ' 的空间……');
                })

            }
        }
    }]);
    module.exports = ngModule;
});