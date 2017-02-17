(function() {

    var app = angular.module("githubViewer");

    var UserController = function($scope, github, $routeParams, $location, $log) {

        var complete = function(data) {
            $scope.user = data;
            github.getRepos($scope.user).then(repos, error);
        };

        var repos = function(data) {
            $scope.repos = data;
            $scope.reposOrder = "-stargazers_count";
        };

        var error = function(error) {
            $scope.error = "Error buscando datos";
            delete $scope.user;
        };

        $scope.orderBy = function(field) {
            if ($scope.reposOrder) {
                var latest = $scope.reposOrder;
                if (latest.indexOf('-') === 0) {
                    $scope.reposOrder = "+" + field;
                } else if (latest.indexOf('+') === 0) {
                    $scope.reposOrder = "-" + field;
                } else {
                    $scope.reposOrder = field;
                }
            }
        };

        $scope.goToRepo = function(repo) {
            $location.path("/user/" + $scope.username + "/" + repo);
        }

        $scope.back = function(uri) {
            $location.path(uri);
        };

        $scope.username = $routeParams.username;

        github.getUser($scope.username).then(complete, error);
    };

    app.controller("UserController", ["$scope", "github", "$routeParams", "$location", "$log", UserController]);

}());