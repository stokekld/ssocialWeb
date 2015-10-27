angular
	.module('formValidationModule', [])
	.factory('valObj', function(){
		return {
			fields: {}
		};
	})
	.directive('valReq', function(valObj){

		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl)
			{
				ctrl.$validators.valReq = function(modelValue, viewValue)
				{
					var name = attrs.name;
					valObj.fields[name] = {};

					if (ctrl.$isEmpty(modelValue))
					{

						valObj.fields[name] = {
							msg: "El campo " + attrs.name + " es requerido."
						};
						return false;
					}

					delete valObj.fields[name];
					return true;
				}
			}
		};

		

	});