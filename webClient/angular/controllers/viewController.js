var viewController = function ($location, $rootScope){

	if ( !angular.isDefined( sessionStorage.ssocialTU ) )
		$location.path('/login');

	this.view = sessionStorage.ssocialTU;


};