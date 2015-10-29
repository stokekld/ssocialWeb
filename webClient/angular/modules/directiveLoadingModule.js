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

		$rootScope.loadingOnElement = function(elmt){

			var tag = elmt.prop('tagName');

			if (tag === 'FORM')
			{
				var inputs = elmt.find('input'); 


				for (var i = 0; i < inputs.length; i++)
				{
					var input = angular.element(inputs[i]);

					if ( input.attr('type') === 'submit' )
						input.button('loading');
					else
						input.attr('readonly', true);
				}
			}
		};

		$rootScope.loadingOffElement = function(elmt){
			var tag = elmt.prop('tagName');

			if (tag === 'FORM')
			{
				var inputs = elmt.find('input'); 


				for (var i = 0; i < inputs.length; i++)
				{
					var input = angular.element(inputs[i]);

					if ( input.attr('type') === 'submit' )
						input.button('reset');
					else
						input.attr('readonly', false);
				}
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