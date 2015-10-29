angular
	.module('structure', ['ngRoute', 'directiveLoadingModule', 'formValidationModule', 'requestModule'])
	.config(function($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl: './angular/views/login.html'
			});
	})
	.controller('loginController', [ 'dataValidation', '$http', loginController]);