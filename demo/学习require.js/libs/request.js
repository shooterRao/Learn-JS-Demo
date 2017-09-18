define(
    function(require) {
    var API = require('API');
    var $ = require('jquery');
    
    //获取当天的信息
    getDayInfo = function(){
        return $.get(API.dayInfo);
    }
    //获取type信息
    getTypeInfo = function(){
        return $.get(API.typeInfo);
    };

    return {
        getDayInfo:getDayInfo,
        getTypeInfo:getTypeInfo
    }

});