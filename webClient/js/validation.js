var validation = function(field){

	this.name = field.name;
	this.value = field.value;
	this.validations = field.validations;
	this.msg = "";

};

validation.prototype.req = function() {

	if (this.value !== "")
		return true;
		
	this.msg = "El campo "+ this.name +" no puede estar vacio";
	return false;

};

validation.prototype.max = function(max) {
	if (this.value.length <= max)
		return true;

	this.msg = "El campo "+ this.name +" solo admite "+ max +" caracteres";
	return false;
};

validation.prototype.getMsg = function() {
	return this.msg;
};

validation.prototype.validate = function() {

	var validations = this.validations;
	var result;

	for ( index in validations)
	{
		if ( angular.isArray(validations[index]) )
			result = this[ validations[index][0] ]( validations[index][1] );
		else
			result = this[ validations[index] ]();
		
		if (!result)
			return false;
	}

	return true;
};