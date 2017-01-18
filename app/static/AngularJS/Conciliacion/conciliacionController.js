registrationModule.controller('conciliacionController', function ($scope, $rootScope, $location, localStorageService, filtrosRepository,alertFactory) {

	// ****************** Se guarda la información del usuario en variable userData
	$rootScope.userData = localStorageService.get('userData');
	
	
	$scope.init = function(){

		$scope.dato = "llllll";

		$scope.aboContaBanco = [{"fecha":"30/01/2017","tipoPol":"UNI-EGRESOS","noPol":"728","concepto":"3210 - TANIA ANGELICA RAMIREZ PALMA","total":"47000"},
					   			{"fecha":"30/01/2017","tipoPol":"UNI-EGRESOS","noPol":"728","concepto":"3210 - TANIA ANGELICA RAMIREZ PALMA","total":"47000"},
					   			{"fecha":"30/01/2017","tipoPol":"UNI-EGRESOS","noPol":"728","concepto":"3210 - TANIA ANGELICA RAMIREZ PALMA","total":"47000"}];




	}
});