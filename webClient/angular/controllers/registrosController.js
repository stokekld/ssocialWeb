var registrosController = function(formData, $http){

	obj = this;
	this.regs = [];
	this.toDelete = {
		idReg: 0,
		nombre: "",
		regIni: "",
		regFin: "",
		regAct: ""
	};
	this.toUpdate = {
		idArray: 0,
		idServ: 0,
		idReg: 0,
		data: {
			regIni:"",
			regFin:"",
			regAct:""
		}
	};

	this.init = function(){
		
		$http.get(appHost + 'registros/novalidados').then(function(response){


			var regs = response.data.data.regNoVal;

			for (index in regs)
				obj.regs.push(regs[index]);

		});

	};

	this.val = function(idArray, idServ, idReg){

		data = {regVal:1};
		
		$http.put(appHost + 'servicio/' + idServ + '/registros/' + idReg, data).then(function(response){

			obj.regs.splice( idArray, 1 );

		});

	};

	this.setDelete = function(idArray){
		obj.toDelete.idArray =  idArray;
		obj.toDelete.idReg =  obj.regs[idArray].idReg;
		obj.toDelete.idServ =  obj.regs[idArray].serv.idServ;
		obj.toDelete.nombre =  obj.regs[idArray].serv.nomServ + " " + obj.regs[idArray].serv.apatServ + " " + obj.regs[idArray].serv.amatServ;
		obj.toDelete.regIni =  obj.regs[idArray].regIni;
		obj.toDelete.regFin =  obj.regs[idArray].regFin;
		obj.toDelete.regAct =  obj.regs[idArray].regAct;
	};

	this.delete = function($event){

		var button = angular.element($event.target);
		var modal = button.parent().parent().parent().parent();



		$http.delete(appHost + 'servicio/' + obj.toDelete.idServ + '/registros/' + obj.toDelete.idReg).then(function(response){

			modal.modal('hide');
			obj.regs.splice( obj.toDelete.idArray, 1 );

		});
	};

	this.setUpdate = function(idArray, idServ, idReg){

		this.toUpdate.idArray = idArray;
		this.toUpdate.idServ = idServ;
		this.toUpdate.idReg = idReg;
		this.toUpdate.data.regIni = this.regs[idArray].regIni;
		this.toUpdate.data.regFin = this.regs[idArray].regFin;
		this.toUpdate.data.regAct = this.regs[idArray].regAct;


	};

	this.sendvalUpdateForm = function(form, $event){

		var $form = angular.element($event.target);
		var $modal = $form.parent().parent().parent();
		
		if (form.$invalid)
		{
			formData.handlerErrors(form.$error, $form);
			return;
		}
		$http.put(appHost + 'servicio/' + obj.toUpdate.idServ + '/registros/' + obj.toUpdate.idReg, obj.toUpdate.data).then(function(response){

			$modal.modal('hide');

			var data = response.data.data;

			obj.regs[obj.toUpdate.idArray].regIni = data.regIni;
			obj.regs[obj.toUpdate.idArray].regFin = data.regFin;
			obj.regs[obj.toUpdate.idArray].regAct = data.regAct;

		});

	};

	this.init();

};