var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html'
    })
    .when('/directory', {
      templateUrl: 'views/directory.html',
      controller: 'ninjaController'
    }).otherwise({
      redirectTo: '/home'
    });

}]);

myApp.controller("ninjaController", ['$scope', function($scope) {

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

  }

  $scope.ninjas = [
    {
      name: 'yoshi',
      belt: 'cyan',
      rate: 50,
      available: true,
      thumb: "https://s-media-cache-ak0.pinimg.com/originals/c8/19/85/c8198523f8e7cea98b0bf1434389eb7e.png"
    },

    {
      name: 'rui',
      belt: 'red',
      rate: 30,
      available: true,
      thumb: "https://s-media-cache-ak0.pinimg.com/originals/59/62/3d/59623d1fc347324a13a3eb4d4be59a63.png"
    },

    {
      name: 'shaun',
      belt: 'green',
      rate: 20,
      available: true,
      thumb: "https://s-media-cache-ak0.pinimg.com/originals/54/46/58/54465853a2766fcf697e603117020d00.png"
    },

    {
      name: 'crystal',
      belt: 'black',
      rate: 1000,
      available: true,
      thumb: "http://vignette3.wikia.nocookie.net/tmnt2012series/images/8/81/Character-raphael-1.png/revision/latest?cb=20120923190550"
    },
  ];
}]);
