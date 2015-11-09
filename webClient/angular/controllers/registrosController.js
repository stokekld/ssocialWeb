var registrosController = function($http){

	obj = this;
	this.regs = [];
	this.toDelete = {
		idReg: 0,
		nombre: "",
		regIni: "",
		regFin: "",
		regAct: ""
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

	this.init();

};