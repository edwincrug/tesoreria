registrationModule.controller('mainController', function ($scope, $rootScope, $location, localStorageService) {

	$rootScope.userData = localStorageService.get('userData');

	$scope.init = function(){
		closeNav();
	}
	// ************** Función para cerrar sesión
	// ************** NOTA se limpian todos los localStorage utilizados
	 $scope.salir = function(){
        localStorageService.clearAll('userData');
        location.href = '/';
    }
});