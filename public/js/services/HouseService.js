angular.module('HouseService', [])

	.factory('Mbl-Houses', ['$http', function($http) {
		return {
			// Ná í mbl.is leiguhúsnæði
			get: function() {
				return $http.get('/api/mbl-leiga');
			}
		}
	}]);