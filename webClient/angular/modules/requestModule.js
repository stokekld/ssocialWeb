angular
	.module('requestModule', ['ngToast'])
	.config(['$httpProvider', function($httpProvider){

		$httpProvider.interceptors.push(function($rootScope, $q, ngToast){
			return {
				'request': function(config){

					if ( angular.isDefined( config.element ) )
						$rootScope.loadingOnElement( config.element )

					$rootScope.loadingOn();

					return config;
				},
				'response': function(response){

					if ( angular.isDefined( response.config.element ) )
						$rootScope.loadingOffElement( response.config.element )

					$rootScope.loadingOff();

					if ( angular.isDefined( response.data.token ) )
					{
						sessionStorage.ssocialT = response.data.token;
						$httpProvider.defaults.headers.common = { 'Authorization':sessionStorage.ssocialT };
					}


					return response;
				},
				'responseError': function(rejection){

					if ( angular.isDefined( rejection.config.element ) )
						$rootScope.loadingOffElement( rejection.config.element )

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
