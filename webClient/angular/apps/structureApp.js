angular
	.module('structure', ['ngRoute', 'directiveLoadingModule', 'formValidationModule', 'requestModule'])
	.config(function($routeProvider){
		$routeProvider
			.when('/login',{
				templateUrl: './angular/views/login.html'
			})
			.when('/', {
				templateUrl: './angular/views/principal.html'
			});
	})
	.controller('loginController', [ 'formData', '$http', '$location', '$rootScope', loginController])
	.controller('viewController', ['$location', '$rootScope', viewController])
	.controller('ipController', ['formData', '$http', ipController])
	.controller('serviciosController', ['formData', '$http', serviciosController])
	.controller('servicioController', ['formData', '$http', '$interval', servicioController])
	.controller('registrosController', ['formData', '$http', registrosController])
	.controller('tabsAdminController', tabsAdminController)
	.controller('navController', ['$location', navController])
	.filter('reverse', function(){
		return function(items) {
			return items.slice().reverse();
		};
	});