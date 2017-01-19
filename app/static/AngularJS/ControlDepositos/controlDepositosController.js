registrationModule.controller('controlDepositosController', function ($scope, $rootScope, $location, localStorageService, filtrosRepository,alertFactory) {

	// ****************** Se guarda la información del usuario en variable userData
	$rootScope.userData = localStorageService.get('userData');
	
	
	$scope.init = function(){
        $scope.calendario();
		$scope.dato = "0000";
	}

	 $scope.calendario = function() {
        $('#calendar2 .input-group.date').datepicker({
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