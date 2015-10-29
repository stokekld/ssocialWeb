angular
	.module('directiveLoadingModule', [])
	.run(function($rootScope){

		$rootScope.loadingElmt = [];

		$rootScope.loadingSet = function(elmt){

			$rootScope.loadingElmt.push(elmt);

		};

		$rootScope.loadingOn = function(){

			var elemts = $rootScope.loadingElmt;

			for (elemt in elemts)
			{
				$elemt = elemts[elemt];

				$elemt.css('visibility', 'visible');
				
			}

		};

		$rootScope.loadingOff = function(){

			var elemts = $rootScope.loadingElmt;

			for (elemt in elemts)
			{
				$elemt = elemts[elemt];

				$elemt.css('visibility', 'hidden');
				
			}

		};

	})
	.directive('loadingElemt', function($rootScope){

		return{
			restrict: 'A',
			link: function(scope, element, attr){

				$rootScope.loadingSet(element);

				element.css('visibility', 'hidden');

			}
		};

	});