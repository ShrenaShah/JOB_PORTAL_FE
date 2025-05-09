app.controller("ViewApplicationController", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
    $scope.applications = [];
    $scope.jobTitle = "";

    // Fetch applications for the job
    $scope.fetchApplications = function() {
        const token = document.cookie.split("; ").find(row => row.startsWith("token=")).split("=")[1];
        const jobId = $routeParams.jobId;

        $http.get(`${$scope.baseUrl}/applications/${jobId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(function(response) {
            $scope.applications = response.data;
            $scope.jobTitle = response.data[0]?.jobTitle || "Job Applications"; 
        })
        .catch(function(error) {
            alert("Failed to fetch applications: " + (error.data.message || "Unknown error"));
            console.error("Error details:", error);
        });
    };

    // Update application status
    $scope.updateStatus = function(applicationId, status) {
        const token = document.cookie.split("; ").find(row => row.startsWith("token=")).split("=")[1];

        $http.put(`${$scope.baseUrl}/applications/${applicationId}`, { status: status }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(function(response) {
            alert(response.data.message);
            $scope.fetchApplications(); // Refresh the applications list
        })
        .catch(function(error) {
            alert("Failed to update application status: " + (error.data.message || "Unknown error"));
            console.error("Error details:", error);
        });
    };

    // Fetch applications on controller initialization
    $scope.fetchApplications();
}]);