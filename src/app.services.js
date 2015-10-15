angular
	.module("fbc")
	.factory('Http', [ function() {
		return function(request){
			return request.then(
				function(response) {
					return response.data;
				},
				function(error) {
					return error.data;
				}
			);
		};
	}]);


