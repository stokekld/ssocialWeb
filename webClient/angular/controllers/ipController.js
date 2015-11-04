var ipController = function(formData, $http){

	obj = this;
	this.ips = [];
	this.ipToDelete = {
		id_ipp: 0,
		ipp: "",
		idArray: 0
	};
	this.formData = {};


	this.getIps = function(){
		$http.get('https://ssocial.app/ip').then(function(response){

			var ips = response.data.data; 

			for ( index in ips )
				obj.ips.push( ips[index] );
		});
	};

	this.setIpDelete = function(id, ip, idArray){
		this.ipToDelete.id_ipp = id;
		this.ipToDelete.ipp = ip;
		this.ipToDelete.idArray = idArray;
	};

	this.ipDelete = function($event)
	{
		var modal = angular.element($event.target).parent().parent().parent().parent();

		var url = 'https://ssocial.app/ip/' + this.ipToDelete.id_ipp;

		$http.delete(url).then(function(response){
			modal.modal('hide');
			obj.ips.splice( obj.ipToDelete.idArray, 1 );
		});
	};

	this.sendIpForm = function(form, $event){

		var modal = angular.element($event.target).parent().parent().parent();

		if (form.$invalid)
		{
			$form = angular.element($event.target);
			formData.handlerErrors(form.$error, $form);
			return;
		}

		$http.post('https://ssocial.app/ip', this.formData, { element: angular.element($event.target) }).then(function(response){

			console.log(response);

			modal.modal('hide');

			var ip = response.data.data;

			obj.ips.push( ip );


		});
	};


	this.getIps();
};