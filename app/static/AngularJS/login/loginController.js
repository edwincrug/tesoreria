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
                localStorageService.set('userData', $scope.login);
                alertFactory.warning('Bienvenido a Talleres: ' + result.data[0].nombreUsuario);
                location.href = '/conciliacionInicio';
            }else{
                alertFactory.info('Valide el usuario y/o contraseña');
            }
      
        });
    }
});
