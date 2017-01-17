registrationModule.controller('conciliacionController', function ($scope, $rootScope, $location, localStorageService, filtrosRepository,alertFactory) {

	// ****************** Se guarda la información del usuario en variable userData
	$rootScope.userData = localStorageService.get('userData');
	
	
	$scope.init = function(){
		$scope.dato = "0000";
	}
});