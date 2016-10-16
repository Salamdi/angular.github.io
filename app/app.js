var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'ninjaController'
    })
    .when('/directory', {
      templateUrl: 'views/directory.html',
      controller: 'ninjaController'
    }).otherwise({
      redirectTo: '/home'
    });

}]);

myApp.directive('randomNinja', [function(){

return {
  restrict: 'E',
  scope: {
    ninjas: '=',
    title: '='
  },
  templateUrl: 'views/random.html', 
  controller: function($scope){
    $scope.random = Math.floor(Math.random() * 4);
  }
};

}]);

myApp.controller("ninjaController", ['$scope', '$http', function($scope, $http) {

  $scope.removeNinja = function(ninja) {
    var removedNinja = $scope.ninjas.indexOf(ninja);
    // $scope.ninjas.splice(removedNinja,1);
    $scope.ninjas[removedNinja].available = false;
  };

  $scope.showAll = function() {
    $scope.ninjas.forEach(function(ninja){
      ninja.available = true;
    })
  };

  $scope.addNinja = function() {
    $scope.ninjas.push({
      name: $scope.newNinja.name,
      belt: $scope.newNinja.belt,
      rate: parseInt($scope.newNinja.rate),
      available: true,
      thumb: ""
    });
    $scope.newNinja.name = "";
    $scope.newNinja.belt = "";
    $scope.newNinja.rate = "";

  };

  $http.get('data/ninjas.json').success(function(data){
    $scope.ninjas = data;
  })


}]);
