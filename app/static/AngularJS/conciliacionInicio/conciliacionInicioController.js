registrationModule.controller('conciliacionInicioController', function ($scope, $rootScope, $location, localStorageService,filtrosRepository, conciliacionInicioRepository,alertFactory) {

	// ****************** Se guarda la información del usuario en variable userData
	$rootScope.userData = localStorageService.get('userData');
	
	
	$scope.init = function(){
		//$scope.calendario();
		 $scope.getEmpresa(15);
		 $scope.getBancos(1);
		 $scope.getCuentaBanco(1)
		$scope.getClaveBanco(1)
		$scope.getCuentacontable(1)		 
		// if($rootScope.userData == null){
		// 	location.href = '/';
		// 	alertFactory.warning('Inicie Sesión')
		// }else{
		// 	alertFactory.success('Bienvenido '+ $rootScope.userData.nombreUsuario)
		// }
		 $rootScope.mostrarMenu = 1;
	}

    $scope.getEmpresa = function(idUsuario) {
        filtrosRepository.getEmpresas(idUsuario).then(function(result) {
            if (result.data.length > 0) {
                $scope.empresaUsuario = result.data;
            }
        });
    }

    $scope.getBancos = function(idBanco) {
        filtrosRepository.getBancos(idBanco).then(function(result) {
            if (result.data.length > 0) {
                $scope.bancoEmpresa = result.data;
            }
        });
    }

    $scope.getCuentaBanco = function(idCuentaBanco) {
        filtrosRepository.getCuentaBanco(idCuentaBanco).then(function(result) {
            if (result.data.length > 0) {
                $scope.bancoCuenta = result.data;
            }
        });
    }

    $scope.getClaveBanco = function(idClaveBanco) {
        filtrosRepository.getClaveBanco(idClaveBanco).then(function(result) {
            if (result.data.length > 0) {
                $scope.bancoClave = result.data;
            }
        });
    }

    $scope.getCuentacontable = function(idCuentacontable) {
        filtrosRepository.getCuentacontable(idCuentacontable).then(function(result) {
            if (result.data.length > 0) {
                $scope.cuentacontable = result.data;
            }
        });
    }

    


});