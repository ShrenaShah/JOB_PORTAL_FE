app.controller("JobsController", ["$scope", "$http", function($scope, $http) {
    $scope.jobs = [];
    $scope.isEmployer = false;

    // Fetch jobs based on user role
    $scope.fetchJobs = function() {
        const loggedInUser = $scope.getLoggedInUser();
        if (!loggedInUser) {
            alert("You must be logged in to view jobs.");
            return;
        }

        $scope.isEmployer = loggedInUser.role === "employer";

        const token = document.cookie.split("; ").find(row => row.startsWith("token=")).split("=")[1];
        const apiUrl = $scope.isEmployer
            ? `${$scope.baseUrl}/jobs/employer/my-jobs`
            : `${$scope.baseUrl}/jobs`;

        $http.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(function(response) {
            $scope.jobs = response.data;
        })
        .catch(function(error) {
            alert("Failed to fetch jobs: " + (error.message || "Unknown error"));
            console.error(error);
        });
    };

    // Delete a job (for employers only)
    $scope.deleteJob = function(jobId) {
        const token = document.cookie.split("; ").find(row => row.startsWith("token=")).split("=")[1];
        $http.delete(`${$scope.baseUrl}/jobs/${jobId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(function(response) {
            alert("Job deleted successfully!");
            $scope.fetchJobs(); // Refresh the job list
        })
        .catch(function(error) {
            alert("Failed to delete job: " + (error.message || "Unknown error"));
            console.error(error);
        });
    };

    $scope.applyForJob = function(jobId) {
        
        const token = document.cookie.split("; ").find(row => row.startsWith("token=")).split("=")[1];
        $http.post(`${$scope.baseUrl}/applications`, { jobId: jobId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(function(response) {
            alert(response.data.message); // Show the success message
        })
        .catch(function(error) {
            // Extract and display the error message from the API response
            const errorMessage = error.data && error.data.message
                ? error.data.message
                : "An unknown error occurred.";
            alert(`Failed to apply for the job: ${errorMessage}`);
            console.error("Error details:", error);
        });
    };

    // Fetch jobs on controller initialization
    $scope.fetchJobs();
}]);