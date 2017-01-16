registrationModule.controller('mainController', function ($scope, $rootScope, $location, localStorageService,alertFactory) {

	$rootScope.userData = localStorageService.get('userData');

	$scope.init = function(){
		closeNav();
	}
	// ************** Función para cerrar sesión
	// ************** NOTA se limpian todos los localStorage utilizados
	 $scope.salir = function(){
	 	alertFactory.warning('Hasta luego '+ $rootScope.userData.nombreUsuario)
        localStorageService.clearAll('userData');
        location.href = '/';
    }
});