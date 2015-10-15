angular
	.module('fbc')
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'components/main-page/main.html'
			})
			.state('info', {
				url: '/info/:id',
				templateUrl: 'components/info/info.html'
			})
	}]);
