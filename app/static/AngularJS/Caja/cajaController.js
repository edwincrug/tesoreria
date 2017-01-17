registrationModule.controller('cajaController', function ($scope, $rootScope, $location, localStorageService, cajaRepository,alertFactory) {

	// ****************** Se guarda la información del usuario en variable userData
	$rootScope.userData = localStorageService.get('userData');
	
	
	$scope.init = function(){		
		 $rootScope.mostrarMenu = 1;
	}
});