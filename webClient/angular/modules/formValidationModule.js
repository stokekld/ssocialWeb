angular
	.module('formValidationModule', ['ngToast'])
	.factory('dataValidation', function(ngToast){
		
		var obj = {
			val: function(data){

				for (field in data)
				{
					var val = new validation(data[field], ngToast);

					if ( !val.validate() )
					{
						ngToast.create({
							className: 'danger',
							content: val.getMsg(),
							dismissButton: true
						});
						return false;
					}
				}

				return true;

			}
		};

		return obj;

	});