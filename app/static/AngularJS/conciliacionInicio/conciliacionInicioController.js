registrationModule.controller('conciliacionInicioController', function ($scope, $rootScope, $location, localStorageService, conciliacionInicioRepository,alertFactory) {

	// ****************** Se guarda la información del usuario en variable userData
	$rootScope.userData = localStorageService.get('userData');
	
	
	$scope.init = function(){
		$scope.calendario();
		// if($rootScope.userData == null){
		// 	location.href = '/';
		// 	alertFactory.warning('Inicie Sesión')
		// }else{
		// 	alertFactory.success('Bienvenido '+ $rootScope.userData.nombreUsuario)
		// }
		 $rootScope.mostrarMenu = 1;
	}

	    $scope.calendario = function() {
        $('#calendar .input-group.date').datepicker({
            todayBtn: "linked",
            keyboardNavigation: true,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true,
            todayHighlight: true,
            format: "dd/mm/yyyy"
        });
    }
});