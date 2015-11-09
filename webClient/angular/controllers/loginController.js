function loginController(formData, $http, $location, $rootScope)
{
	this.formData = {};

	this.sendData = function(form, $event){

		if (form.$invalid)
		{
			$form = angular.element($event.target);
			formData.handlerErrors(form.$error, $form);
			return;
		}


		$http.post(appHost + 'logIn', this.formData, { element: angular.element($event.target) }).then(function(response){

			sessionStorage.ssocialTU = response.data.type;
			sessionStorage.auth = true;
			$location.path("/");
			
		});
	};
};