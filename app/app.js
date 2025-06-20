// app/app.js
const app = angular.module("jobPortalApp", ["ngRoute"]);

app.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/login", {
        templateUrl: "app/views/login.html",
        controller: "LoginController",
      })
      .when("/register", {
        templateUrl: "app/views/register.html",
        controller: "RegisterController",
      })
      .when("/jobs", {
        templateUrl: "app/views/jobs.html",
        controller: "JobsController",
      })
      .when("/create-job", {
        templateUrl: "app/views/createJob.html",
        controller: "CreateJobController",
      })
      .when("/profile", {
        templateUrl: "app/views/profile.html",
        controller: "ProfileController",
      })
      .when("/applications/:jobId", {
        templateUrl: "app/views/viewApplications.html",
        controller: "ViewApplicationController",
      })
      .otherwise({
        redirectTo: "/login",
      });
  },
]);

app.controller("MainController", [
  "$scope",
  function ($scope) {
    $scope.baseUrl = "https://job-portal-be-mbyo.onrender.com/api";

    $scope.logout = function () {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/#!/login";
    };
    $scope.getLoggedInUser = function () {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    };
    // $scope.isEmployer = function() {
    //     const user = $scope.getLoggedInUser();
    //     if (user && user.role === 'employer') {
    //         return true;
    //     }
    //     return false; // Explicitly return false if the user is not an employer
    // }
  },
]);

app.directive("fileModel", [
  "$parse",
  function ($parse) {
    return {
      restrict: "A",
      link: function (scope, element, attrs) {
        const model = $parse(attrs.fileModel);
        const modelSetter = model.assign;

        element.bind("change", function () {
          scope.$apply(function () {
            modelSetter(scope, element[0].files[0]);
          });
        });
      },
    };
  },
]);
