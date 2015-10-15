angular
	.module("fbc")
	.factory("MainService", ['$http', 'appConstants', 'Http',  function($http, appConstants, Http) {
	return {
		getChampionship: function() {
			return Http($http.get(appConstants.Championships))
		},
		getTeam: function() {
			return Http($http.get(appConstants.Teams))
		}
	}
	}]);