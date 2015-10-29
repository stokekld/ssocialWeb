angular
	.module('requestModule', ['ngToast'])
	.config(['$httpProvider', function($httpProvider){

		$httpProvider.interceptors.push(function($rootScope, $q, ngToast){
			return {
				'request': function(config){

					console.log(config);

					$rootScope.loadingOn();

					return config;
				},
				'response': function(response){

					console.log(response);

					$rootScope.loadingOff();

					if ( angular.isDefined( response.data.token ) )
						$httpProvider.defaults.headers.common = { 'Authorization':response.data.token };

					return response;
				},
				'responseError': function(rejection){

					console.log(rejection);

					$rootScope.loadingOff();

					if ( angular.isDefined( rejection.data.message ) )
						ngToast.create({
							className: 'danger',
							content: rejection.data.message,
							dismissButton: true
						});

					return $q.reject(rejection);
				}
			};
		});

	}]);
