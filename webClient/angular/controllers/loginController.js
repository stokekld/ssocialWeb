function loginController(dataVal, $http)
{
	this.formData = {
		user: {
			name: "Usuario",
			formName: "user",
			value: "",
			validations: [
				'req'
			]
		},
		password: {
			name: "Password",
			formName: "password",
			value: "",
			validations: [
				'req'
			]
		}
	};

	this.sendData = function(form){
		var validation = dataVal.val(this.formData);

		if (!validation)
			return false;

		var obj = {};

		for (field in this.formData)
		{
			obj[field] = this.formData[field].value;
		}

		console.log("form");
		console.log(angular.element(form.target));

		$http.post('http://ssocial.app/logIn', obj, { element: angular.element(form.target) });
	};
};