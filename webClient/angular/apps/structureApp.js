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
	.controller('loginController', [ 'dataValidation', '$http', '$location', loginController]);