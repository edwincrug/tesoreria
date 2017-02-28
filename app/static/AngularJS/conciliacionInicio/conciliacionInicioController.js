registrationModule.controller('conciliacionInicioController', function($scope, $rootScope, $location, $timeout, $log, localStorageService, filtrosRepository, conciliacionInicioRepository, alertFactory, uiGridConstants, i18nService, uiGridGroupingConstants) {

    // ****************** Se guarda la información del usuario en variable userData
    $rootScope.userData = localStorageService.get('userData');
    $scope.nodoPadre = [];
   

    $scope.init = function() {
        //$scope.calendario();
        $scope.getEmpresa(15);
        //$scope.getBancos(1);
        //$scope.getCuentaBanco(1, 1)
        //$scope.getClaveBanco(1)
        //$scope.getCuentacontable(1)

        // if($rootScope.userData == null){
        //  location.href = '/';
        //  alertFactory.warning('Inicie Sesión')
        // }else{
        //  alertFactory.success('Bienvenido '+ $rootScope.userData.nombreUsuario)
        // }
        $rootScope.mostrarMenu = 1;
    }

    $scope.getEmpresa = function(idUsuario) {
        filtrosRepository.getEmpresas(idUsuario).then(
            function(result) {
                if (result.data.length > 0) {
                    $scope.empresaUsuario = result.data;
                }
            });
    }

    $scope.getBancos = function(idBanco) {
        filtrosRepository.getBancos(idBanco).then(function(result) {
            if (result.data.length > 0) {
                $scope.bancoEmpresa = result.data;
                console.log($scope.bancoEmpresa)
            }
            else
            {
                $scope.bancoCuenta = [];
                $scope.bancoEmpresa = [];
            }
        });
    }

    $scope.getCuentaBanco = function(idCuentaBanco, idempresa) {
        filtrosRepository.getCuentaBanco(idCuentaBanco, idempresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.bancoCuenta = result.data;
                console.log(result.data)
            }
        });
    }

    $scope.getClaveBanco = function(idClaveBanco) {
        filtrosRepository.getClaveBanco(idClaveBanco).then(function(result) {
            if (result.data.length > 0) {
                $scope.bancoClave = result.data;
                //console.log(result.data)
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

    //LQMA 27022017 add obtiene datos para llenar filtro de cuenta
    $scope.getCuenta = function(idBanco,idEmpresa) {
        //console.log('sdsdsd')
        //console.log(idBanco,idEmpresa)
        filtrosRepository.getCuenta(idBanco,idEmpresa).then(function(result) {
            if (result.data.length > 0) {

                console.log(result.data)
                $scope.bancoCuenta = result.data;
            }
            else
             $scope.bancoCuenta = [];   
        });
    }   
    

    $scope.getTotalesAbonoCargo = function() {

        conciliacionInicioRepository.getTotalAbonoCargo($scope.bancoCuenta.IdBanco,$scope.bancoCuenta.IdEmpresa,$scope.bancoCuenta.Cuenta,$scope.bancoCuenta.CuentaContable).then(function(result){
           if (result.data.length > 0) {

                console.log('entra')
                console.log(result.data)
                $scope.totalesAbonosCargos = result.data;

            }
            else
            {
                console.log('no hay nada')
                $scope.totalesAbonosCargos = []; 
            }

        });
    }
    
});
