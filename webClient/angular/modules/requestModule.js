angular
	.module('requestModule', ['ngToast'])
	.factory('requester', function($http, ngToast){

		var host = "http://ssocial.app";

		var obj = {
			token: "",
			request: function(method, url, data){
				$http[method](host + url, data).then(function(response){
					console.log(response);

				}, function(res){
					if (res.data.error)
						ngToast.create({
							className: 'danger',
							content: res.data.message,
							dismissButton: true
						});


				});
			}
		};

		return obj;

	});
