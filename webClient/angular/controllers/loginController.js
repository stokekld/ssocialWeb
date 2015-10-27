function loginController(valObj)
{
	this.valObj = valObj;
	this.formData = {};
};

loginController.prototype.sendData = function(valid) {
	
	console.log(this.valObj);
};