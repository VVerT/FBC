angular
	.module('fbc')
	.controller('InfoCtrl', ['$scope', '$q', 'MainService', '$stateParams', '$state', function($scope, $q, MainService, $stateParams, $state ) {
			MainService.getTeam().then(function(data) {
			$scope.teams = data.result;
			$scope.teams.forEach(function(el){el.title = el.title.replace(/<\/?[^>]+(>|$)|&nbsp;/g, "")});
			$scope.champTeamId = $stateParams.id;
				$scope.loaded = true;
		});
		$scope.main = function() {
			$state.go('main');
		};
		}]);
