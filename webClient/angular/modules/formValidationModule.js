angular
	.module('formValidationModule', ['ngToast'])
	.factory('formData', function(ngToast){
		
		var obj = {
			handlerErrors: function($errors, $form){

				var firstTypeError = $errors[ Object.keys($errors)[0] ];
				var firstField = firstTypeError[0];
				var error = Object.keys( firstField.$error )[0];
				var msg = "";


				if ( error === 'required' )
					msg = "El campo " + firstField.$name + " es requerido.";
				else if ( error === 'minlength' )
					msg = "El campo " + firstField.$name + " admite al menos " + $form.find('input[name="' + firstField.$name + '"]').attr('minlength') + " caracteres";
				else if ( error === 'pattern' )
					msg = "El campo " + firstField.$name + " no tiene el patron correcto.";
				else
					console.log(error);

				ngToast.create({
					className: 'danger',
					content: msg,
					dismissButton: true
				});
			}
		};

		return obj;

	});

	