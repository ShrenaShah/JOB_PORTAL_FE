app.controller("RegisterController", ["$scope", "$http", function($scope, $http) {
    $scope.registerData = {};

    $scope.register = function () {
        console.log($scope.baseUrl);
        
        $http.post($scope.baseUrl+"/users/register", $scope.registerData)
            .then(function (response) {
                const { message, user } = response.data;

                alert(message + " as " + user.role);
                console.log("Registered user:", user);

                // Optionally, redirect to login
                window.location.href = "#!/login";
            })
            .catch(function (error) {
                alert("Registration failed: " + error.data.message || "Unknown error");
                console.error(error);
            });
    };
}]);
