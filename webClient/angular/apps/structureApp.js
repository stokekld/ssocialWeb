angular
	.module('structure', ['ngRoute', 'formValidationModule', 'requestModule'])
	.config(function($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl: './angular/views/login.html'
			});
	})
	.controller('loginController', ['valObj', loginController]);