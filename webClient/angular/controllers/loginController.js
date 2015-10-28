function loginController(dataVal, req)
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

	this.sendData = function(){
		var validation = dataVal.val(this.formData);

		if (!validation)
			return false;

		var obj = {};

		for (field in this.formData)
		{
			obj[field] = this.formData[field].value;
		}

		console.log(obj);

		req.request('post', '/logIn', obj);
	};
};