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
		$http.get(appHost + 'ip').then(function(response){

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

		var url = appHost + 'ip/' + this.ipToDelete.id_ipp;

		$http.delete(url).then(function(response){
			modal.modal('hide');
			obj.ips.splice( obj.ipToDelete.idArray, 1 );
		});
	};

	this.sendIpForm = function(form, $event){

		var $form = angular.element($event.target);
		var modal = $form.parent().parent().parent();

		if (form.$invalid)
		{
			formData.handlerErrors(form.$error, $form);
			return;
		}

		$http.post(appHost + 'ip', this.formData, { element: angular.element($event.target) }).then(function(response){

			modal.modal('hide');
			$form[0].reset();

			var ip = response.data.data;

			obj.ips.push( ip );


		});
	};


	this.getIps();
};