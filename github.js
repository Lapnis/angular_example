(function() {

    var github = function($http) {

        var getUser = function(user) {
            return $http.get("https://api.github.com/users/" + user)
                .then(function(response) {
                    return response.data;
                });
        };

        var repos = function(user) {
            return $http.get(user.repos_url)
                .then(function(response) {
                    return response.data;
                });
        };

        var repoDetails = function(user, repo) {
            return $http.get("https://api.github.com/repos/" + user + "/" + repo)
                .then(function(response) {
                    return response.data;
                });
        };
        
        var collaborators = function(user, repo) {
            return $http.get("https://api.github.com/repos/" + user + "/" + repo + "/contributors")
                .then(function(response) {
                    return response.data;
                });
        };


        return {
            getUser: getUser,
            getRepos: repos,
            getCollaborators: collaborators,
            repoDetails: repoDetails
        };
    };


    var module = angular.module("githubViewer");
    module.factory("github", github);
}());