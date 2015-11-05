var servicioController = function (formData, $http){

	obj = this;
	this.formNewData = {};
	this.formUpdateId;
	this.formUpdateData = {};
	this.ServToDelete = {
		name : ""
	};
	this.servs = [];

	this.getServ = function(){
		$http.get('https://ssocial.app/servicio').then(function(response){

			var servs = response.data.data; 

			for ( index in servs )
				obj.servs.push( servs[index] );
		});
	};

	this.toggleAct = function (idArray, idServ, activoServ){

		var newValue;

		if (activoServ === "1")
			newValue = "0";
		else
			newValue = "1";

		sendData = {
			activoServ: newValue
		};


		$http.put('https://ssocial.app/servicio/' + idServ, sendData).then(function(response){

			obj.servs[idArray].activoServ = newValue;

		});


	};

	this.sendNewServForm = function(form, $event){

		var $form = angular.element($event.target);
		
		if (form.$invalid)
		{
			formData.handlerErrors(form.$error, $form);
			return;
		}

		this.formNewData.activoServ = 1;
		var modal = $form.parent().parent().parent();

		$http.post('https://ssocial.app/servicio', this.formNewData, { element: angular.element($event.target) }).then(function(response){

			modal.modal('hide');
			$form[0].reset();
			var serv = response.data.data;
			obj.servs.push( serv );

		});

	};

	this.setUpdateData = function(idArray, idServ){

		this.servs[idArray].semestreServ = parseInt(this.servs[idArray].semestreServ);
		this.formUpdateId = idArray;
		this.formUpdateData = angular.extend({}, this.servs[idArray]);

	};

	this.sendUpdateServForm = function(form, $event){

		var $form = angular.element($event.target);
		var modal = $form.parent().parent().parent();
		var servOld = this.servs[this.formUpdateId];
		var servNew = this.formUpdateData;
		var data = {};
		
		if (form.$invalid)
		{
			formData.handlerErrors(form.$error, $form);
			return;
		}

		

		for ( prop in this.formUpdateData )
			if ( servNew[prop] !== servOld[prop] )
				data[prop] = servNew[prop];

		$http.put('https://ssocial.app/servicio/' + this.formUpdateData.idServ, data).then(function(response){

			modal.modal('hide');
			$form[0].reset();
			obj.servs[obj.formUpdateId] = response.data.data;

		});


	};

	this.setDeleteData = function (idArray, idServ){
		this.ServToDelete.name = this.servs[idArray].nomServ + " " + this.servs[idArray].apatServ + " " + this.servs[idArray].amatServ;
		this.ServToDelete.idServ = idServ;
		this.ServToDelete.idArray = idArray;
	};

	this.sendDeleteServ = function ($event){

		var modal = angular.element($event.target).parent().parent().parent().parent();
		var url = 'https://ssocial.app/servicio/' + this.ServToDelete.idServ;

		$http.delete(url).then(function(){
			modal.modal('hide');
			obj.servs.splice( obj.ServToDelete.idArray, 1 );
		});
	};

	this.getServ();
};