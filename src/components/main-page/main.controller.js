angular
	.module('fbc')
	.controller('MainCtrl', ['$scope', '$q', 'MainService', function($scope, $q, MainService) {
		$q.all([
			MainService.getChampionship(),
			MainService.getTeam()
		]).then(function(data) {
			console.log(data);
			$scope.champs = data[0].result;
			var champs = data[0].result;
			var teams = data[1].result;
			function createData(champs, teams) {
				var newArr = [];
				if (typeof champs.forEach === 'function')
					champs.forEach(function(el) {
						var obj = {
							name: el.name,
							teams: getTeam(el.id_championship, teams)
						};
						newArr.push(obj)
					});
				return newArr
			}
			function getTeam(id, arr) {
				return arr.filter(function(teams) {
					return teams.id_championship === id;
				});
			}
			$scope.dats = createData(champs, teams);
			$scope.loaded = true;
		});
		}]);
