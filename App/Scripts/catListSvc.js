'use strict';
angular.module('catApp')
.factory('catListSvc', ['$http', function ($http) { 
    return {
        getItems : function(){
            return $http.get('/api/CatList');
        },
        getItem : function(id){
            return $http.get('/api/CatList/' + id);
        },
        postItem : function(item){
            return $http.post('/api/CatList/',item);
        },
        putItem : function(item){
            return $http.put('/api/CatList/', item);
        },
        deleteItem : function(id){
            return $http({
                method: 'DELETE',
                url: '/api/CatList/' + id
            });
        }
    };
}]);