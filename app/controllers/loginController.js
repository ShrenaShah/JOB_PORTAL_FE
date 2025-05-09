app.controller("LoginController", ["$scope", "$http", function($scope, $http) {
    $scope.loginData = {};

    $scope.login = function () {
        $http.post($scope.baseUrl+"/users/login", $scope.loginData)
            .then(function (response) {
                const { message, user, token } = response.data;

                alert(message + " as " + user.role);

                // Store JWT token in cookie
                document.cookie = "token=" + token + "; path=/";
                localStorage.setItem("user", JSON.stringify(user));
                // You can redirect user to dashboard here
                window.location.href = "/#!/jobs";
                console.log("User:", user);
            })
            .catch(function (error) {
                alert("Login failed: " + error.data.message || "Unknown error");
                console.error(error);
            });
    };
}]);
