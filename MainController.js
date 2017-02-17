(function() {

    var app = angular.module("githubViewer");

    var MainController = function($scope, $interval, $location) {

        $scope.search = function(user) {
            $interval.cancel($scope.counter);
            delete $scope.counter;

            $location.path("/user/"+user);
        };

        var decreaseCount = function() {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                if ($scope.username) {
                    $scope.search($scope.username);
                }else{
                    $scope.countdown = 10;
                    startCountdown();
                }
            }
        };

        var startCountdown = function() {
            $scope.counter = $interval(decreaseCount, 1000, 10);
        };

        $scope.username = "angular";
        $scope.countdown = 10;
        startCountdown();
    };

    app.controller("MainController", ["$scope", "$interval", "$location", MainController]);

}());