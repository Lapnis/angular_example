(function() {

    var app = angular.module("githubViewer");

    var RepoController = function($scope, github, $routeParams,$log,$location) {

        var completeCollabs = function(data) {
            $scope.collabs = data;
        };

        var completeRepoDetails = function(data) {
            $scope.repo = data;
        };

        var error = function(error) {
            $scope.error = "Ha ocurrido un error";
        };

        $scope.orderBy = function(field) {
            if ($scope.collabsOrder) {
                var latest = $scope.collabsOrder;
                if (latest.indexOf('-') === 0) {
                    $scope.collabsOrder = "+" + field;
                } else if (latest.indexOf('+') === 0) {
                    $scope.collabsOrder = "-" + field;
                } else {
                    $scope.collabsOrder = field;
                }
            }
        };

        $scope.back = function(uri) {
            $location.path(uri);
        };

        $scope.username = $routeParams.username;
        $scope.reponame = $routeParams.reponame;
        $scope.collabsOrder = '-contributions';

        github.getCollaborators($scope.username, $scope.reponame)
            .then(completeCollabs, error);
        github.repoDetails($scope.username, $scope.reponame)
            .then(completeRepoDetails, error);
    };

    app.controller("RepoController", ["$scope", "github", "$routeParams", "$log", "$location", RepoController]);
}());