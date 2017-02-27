registrationModule.controller('loginController', function($scope, $rootScope, $location, loginRepository, alertFactory, localStorageService) {


    $scope.init = function() {
        $rootScope.mostrarMenu = 0;
        localStorageService.clearAll('userData');
    }

    // *************************** Función para logueo de portal *****************
    $scope.permisos = function(usuario, contrasena) {
        loginRepository.getPermisos(usuario, contrasena).then(function(result) {
            if (result.data.length > 0) {
                $scope.login = result.data[0];
                if ($scope.login.idPerfil == 4) {
                    $rootScope.controlDepositosAcceso = 1;
                    $rootScope.conciliacionAccesso = 0;
                    alertFactory.warning('Bienvenido a Tesorería: ' + result.data[0].nombreUsuario);
                    location.href = '/conciliacionInicio';
                    localStorageService.set('userData', $scope.login);
                } else {
                    $rootScope.controlDepositosAcceso = 0;
                    $rootScope.conciliacionAccesso = 1;
                    alertFactory.warning('Bienvenido a Tesorería: ' + result.data[0].nombreUsuario);
                    location.href = '/controlDepositos';
                    localStorageService.set('userData', $scope.login);
                    
                }                

            } else {
                alertFactory.info('Valide el usuario y/o contraseña');
            }

        });
    }
});
