registrationModule.controller('mainController', function($scope, $rootScope, $location, localStorageService, alertFactory) {

    $rootScope.userData = localStorageService.get('userData');

    $scope.init = function() {
            $rootScope.mostrarMenu = 1;
            if ($rootScope.userData.idPerfil == 4) {
            	$rootScope.controlDepositosAcceso = 0;
                $rootScope.conciliacionAccesso = 1;          
                console.log('Administrador Control Depositos')
            } else {
                $rootScope.controlDepositosAcceso = 1;
                $rootScope.conciliacionAccesso = 0;
            }
            /*if($rootScope.userData == null){
            	$rootScope.mostrarMenu = 0;
            	alertFactory.warning('Inicie Sesión')
            }else{
            	alertFactory.success('Bienvenido '+ $rootScope.userData.nombreUsuario)
            	$rootScope.mostrarMenu = 1;
            }*/
        }
        // ************** Función para cerrar sesión
        // ************** NOTA se limpian todos los localStorage utilizados
    $scope.salir = function() {
        alertFactory.warning('Hasta luego ' + $rootScope.userData.nombreUsuario)
        localStorageService.clearAll('userData');
        location.href = '/';
    }
});
