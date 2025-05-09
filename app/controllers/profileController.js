app.controller("ProfileController", ["$scope", "$http", function($scope, $http) {
    $scope.uploadResume = function() {
        if (!$scope.resumeFile) {
            alert("Please select a file to upload.");
            return;
        }

        $scope.isLoading = true;
        const formData = new FormData();
        formData.append("resume", $scope.resumeFile);

        const token = document.cookie.split("; ").find(row => row.startsWith("token=")).split("=")[1];

        $http.post(`${$scope.baseUrl}/users/upload-resume`, formData, {
            headers: {
                "Content-Type": undefined, // Let the browser set the Content-Type
                Authorization: `Bearer ${token}`
            }
        })
        .then(function(response) {
            alert("Resume uploaded successfully!");
            console.log("Upload response:", response.data);
        })
        .catch(function(error) {
            alert("Failed to upload resume: " + (error.data.message || "Unknown error"));
            console.error("Error details:", error);
        })
        .finally(function() {
            $scope.isLoading = false; // Stop loading
        });;
    };
    $scope.appliedJobs = [];

    // Fetch applied jobs
    $scope.fetchAppliedJobs = function() {
        const token = document.cookie.split("; ").find(row => row.startsWith("token=")).split("=")[1];

        $http.get(`${$scope.baseUrl}/users/applications`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(function(response) {
            $scope.appliedJobs = response.data;
        })
        .catch(function(error) {
            alert("Failed to fetch applied jobs: " + (error.data.message || "Unknown error"));
            console.error("Error details:", error);
        });
    };

    // Fetch applied jobs on controller initialization
    $scope.fetchAppliedJobs();
    
}]);