var navController = function ($location){

	this.isAuth = function (){
		return (angular.isDefined( sessionStorage.auth ) && sessionStorage.auth == "true");
	};

	this.logOut = function (){
		sessionStorage.removeItem('ssocialT');
		sessionStorage.removeItem('ssocialTU');
		sessionStorage.removeItem('auth');
		$location.path("/login");
	};

};