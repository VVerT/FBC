describe('Controller: MainCtrl', function() {
	var scope;
	var MainService;
	var deferred;
	var httpBackend;
	beforeEach(module('fbc'));

	beforeEach(inject(function($rootScope, $controller, _MainService_, $q, $httpBackend) {
			scope = $rootScope.$new();
			MainService = _MainService_;
			deferred = $q.defer();
			httpBackend = $httpBackend;
			deferred.resolve([{"id_teams":"1","name":"qwe","id_championship":"1"},{"id_teams":"2","name":"qwe","id_championship":"1"}],[{"id_championship": "1", "name": "Україна"},{"id_championship": "2", "name": "bla"}]);
			$controller('MainCtrl', {
				$scope: scope, MainService: MainService, $q: $q
			});
			spyOn(MainService, 'getChampionship').and.returnValue(deferred.promise);
			spyOn(MainService, 'getTeam').and.returnValue(deferred.promise);
			httpBackend.expectGET('http://footballbet.com.ua/api/championships/');
			httpBackend.expectGET('http://footballbet.com.ua/api/teams/');


		}
			));

	it('should expect URL', function() {
		httpBackend.expectGET('http://footballbet.com.ua/api/championships/');
		httpBackend.expectGET('http://footballbet.com.ua/api/teams/');
			});
});


