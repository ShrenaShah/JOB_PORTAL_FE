app.controller("CreateJobController", ["$scope", "$http", function($scope, $http) {
    $scope.jobData = {};

    $scope.createJob = function() {
        
        const loggedInUser = $scope.getLoggedInUser();
        if (!loggedInUser) {
            alert("You must be logged in to create a job.");
            return;
        }
        if(loggedInUser.role !== 'employer'){
            alert("You must be employer to post the job")
            return
        }

        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        $http.post($scope.baseUrl + "/jobs", $scope.jobData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(function(response) {
            alert("Job created successfully!");
            console.log("Created job:", response.data);

            // Optionally, redirect to the jobs page
            window.location.href = "#!/jobs";
        })
        .catch(function(error) {
            alert("Failed to create job: " + (error.message || "Unknown error"));
            console.error(error);
        });
    };
}]);