var servicioController = function(formData, $http, $interval) {

	var obj = this;
	this.status;
	this.stringTime = "--:--:--";
	this.formData = {};
	this.timer = new Timer();
	this.registros = [];
	this.accumulated = 0;

	this.nombreServ = "";
	this.carrearServ = "";
	this.semestreServ = "";

	this.init = function (){

		$http.get(appHost + 'servicio/current/who').then(function(response){
			console.log(response);
			obj.nombreServ = response.data.data.nombre;
			obj.carrearServ = response.data.data.carrera;
			obj.semestreServ = response.data.data.semestre;

		});

		$http.get(appHost + 'servicio/current/status').then(function(response){

			obj.status = response.data.data.status;

			if (obj.status !== "bootable")
			{
				obj.timer.start({precision: 'seconds', startValues: {seconds: response.data.data.seconds}});
				obj.changeStringTime();
			}

		});

		$http.get(appHost + 'servicio/current/ownregistros').then(function(response){

			var data = response.data.data;

			for ( index in data )
			{
				var registro = data[index];
				var segundos = (registro.seconds/(60*60))*100;
				registro.seconds = Math.round( segundos ) / 100;
				obj.registros.push( data[index] );
			}

			obj.getAccumulated();
		});


	};

	this.start = function(){

		$http.post(appHost + 'servicio/current/inicio').then(function(response){

			obj.timer.start();
			obj.status = null;
			obj.changeStringTime();
				

		});

	};

	this.stop = function(form, $event){

		var $form = angular.element($event.target);
		var modal = $form.parent().parent().parent();

		if (form.$invalid)
		{
			formData.handlerErrors(form.$error, $form);
			return;
		}

		$http.post(appHost + 'servicio/current/fin', this.formData, { element: angular.element($event.target) }).then(function(response){

			modal.modal('hide');
			$form[0].reset();
			obj.timer.stop();
			obj.status = "bootable";

			var registro = response.data.data;
			var segundos = (registro.seconds/(60*60))*100;
			registro.seconds = Math.round( segundos ) / 100;

			if (registro.regVal == "1")
				obj.registros.push(response.data.data);

			obj.getAccumulated();

		});

	};

	this.isBootable = function(){
		return this.status === "bootable";
	};

	this.changeStringTime = function(){

		var changer = $interval(function(){

			obj.stringTime = obj.timer.getTimeValues().toString();

		}, 1000);

	};

	this.getAccumulated = function(){
		this.accumulated = 0;
		var sum = 0;

		for ( index in this.registros )
		{
			var registro = this.registros[index];

			sum += registro.seconds;
		}

		this.accumulated = Math.round( sum * 100 ) / 100;
	};

	this.init();

};