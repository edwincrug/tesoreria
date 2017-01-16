registrationModule.controller('filtrosController', function ($scope, $rootScope, $location, localStorageService, filtrosRepository,alertFactory) {

	// ****************** Se guarda la información del usuario en variable userData
	$rootScope.userData = localStorageService.get('userData');
	
	
	$scope.init = function(){
		if($rootScope.userData == null){
			location.href = '/';
			alertFactory.warning('Inicie Sesión')
		}else{
			alertFactory.success('Bienvenido'+ $scope.$rootScope.userData.nombreUsuario)
		}
		$rootScope.mostrarMenu = 1;
	}
});