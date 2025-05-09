app.controller("NavbarController", ["$scope", '$location',function($scope,$location) {
    $scope.isActive = function(viewLocation) {
        return $location.path() === viewLocation;
    };
    $scope.isLoggedIn = false;
    const loggedInUser = $scope.getLoggedInUser();
        if (!loggedInUser) {
            alert("You must be logged in to view jobs.");
            return;
        }

    $scope.isEmployer = loggedInUser.role === "employer";

    // Check if the user is logged in
    $scope.checkLoginStatus = function() {
        const token = document.cookie.split("; ").find(row => row.startsWith("token="));
        $scope.isLoggedIn = !!token; // Set to true if token exists
    };

    // Call the function to initialize login status
    $scope.checkLoginStatus();

    // Logout function
    $scope.logout = function() {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        $scope.isLoggedIn = false;
        window.location.href = "/#!/login";
    };
    
}]);