var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

myApp.config(['$routeProvider', function($routeProvider){

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'ninjaController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactController'
    })
    .when('/contact-success', {
      templateUrl: 'views/contact-success.html'
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
  transclude: true,
  replace: true,
  controller: function($scope){
    $scope.random = Math.floor(Math.random() * 4);
  }
};

}]);

myApp.controller("ninjaController", ['$scope', '$http', function($scope, $http) {

  $scope.dataTransfer = {};

  $scope.removeNinja = function(ninja) {
    var removedNinja = $scope.ninjas.indexOf(ninja);
    $scope.ninjas.splice(removedNinja,1);
    // $scope.ninjas[removedNinja].available = false;
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

  $scope.removeAll = function(){
    // $scope.ninjas.forEach($scope.removeNinja);
    var length = $scope.ninjas.length;
    $scope.ninjas.splice(0, length);
  }

  if (angular.ninjas) {
    $scope.ninjas = angular.ninjas;
  } else {
    $http.get('data/ninjas.json').success(function(data){
      $scope.ninjas = data;
      angular.ninjas = $scope.ninjas;
    });
  }

}]);

myApp.controller('ContactController', ['$scope', '$location', function($scope, $location){

  $scope.sendMessage = function(){
    $location.path('/contact-success')
  }

}])
