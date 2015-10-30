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


		$http.post('https://ssocial.app/logIn', this.formData, { element: angular.element($event.target) }).then(function(response){

			sessionStorage.ssocialTU = response.data.type;
			$location.path("/");
			
		});
	};
};