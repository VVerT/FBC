describe('Controller: InfoCtrl', function() {
	var scope;
	var MainService;
	var deferred;
	var state;
	var httpBackend;

	beforeEach(module('fbc'));

	beforeEach(inject(function($rootScope, $controller, _MainService_, $q, $state, $httpBackend) {
			scope = $rootScope.$new();
			MainService = _MainService_;
			deferred = $q.defer();
			state = $state;
			httpBackend = $httpBackend;
			$controller('InfoCtrl', {
				$scope: scope, MainService: MainService
			});

			spyOn(MainService, 'getTeam').and.returnValue(deferred.promise);
			spyOn(state, 'go').and.callThrough();
		}
			));

	it('should go to main state', function() {
		scope.main();
		expect(state.go).toHaveBeenCalledWith('main');
	});
	it('should expect URL', function() {
		httpBackend.expectGET('http://footballbet.com.ua/api/teams/');
	});


});


