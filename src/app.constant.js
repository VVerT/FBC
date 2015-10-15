(function() {
	var baseURL = 'http://footballbet.com.ua';
	angular.module('fbc')
		.constant('appConstants', {
			Championships: baseURL + '/api/championships/',
			Teams: baseURL + '/api/teams/'
		})
})();