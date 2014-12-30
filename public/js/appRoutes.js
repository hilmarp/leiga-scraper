angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// Forsíðan
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		});

		$locationProvider.html5Mode(true);

}]);