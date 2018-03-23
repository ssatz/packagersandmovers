var ajaxExample = angular.module('ajaxExample', []);

ajaxExample.controller('mainController',function($scope,$http){
    $scope.people;

$scope.addPerson = function() {
    alert(3232);
    $http({
        
         method: 'POST',
         url:  '/api/usercreation.php',
         data: {newName: $scope.userName, newPhone: $scope.email }
         
    }).then(function (response) {// on success
      
         $scope.getPeople();
      
    }, function (response) {
        
         console.log(response.data,response.status);
         
    });
};
});