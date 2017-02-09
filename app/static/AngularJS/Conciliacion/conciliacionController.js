registrationModule.controller('conciliacionController', function ($scope, $rootScope, $location, localStorageService,alertFactory,conciliacionRepository) {

	// ****************** Se guarda la información del usuario en variable userData
	$rootScope.userData = localStorageService.get('userData');

	// $scope.panels = [
 //        { name: 'Abonos Contables', active: true, className: 'active' },
 //        { name: 'Abonos Bancarios', active: false, className: '' },
 //        { name: 'Cargo Contable', active: false, className: '' },
 //        { name: 'Cargo Bancario', active: false, className: '' }
 //    ];
	
	$scope.init = function(){
		$scope.calendario();

		$scope.dato = "llllll";

        $scope.totalAboContaBanco = 0;
        $scope.totalAboBancoConta = 0;
        $scope.totalCargoContaBanco = 0;
        $scope.totalCargoBancoConta = 0;

		$scope.abonosContables = [];
	    $scope.cargosContables = [];
        $scope.abonosBancarios = [];
        $scope.cargosBancarios = [];

        $scope.getAbonoContable(0,0,0);
        $scope.getCargoContable(0,0,0);
        $scope.getAbonoBancario(0,0,0);
        $scope.getCargoBancario(0,0,0);

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

    $scope.getAbonoContable = function(idEmpresa, fInicial, fFinal) {
        conciliacionRepository.getAbonoContable(idEmpresa, fInicial, fFinal).then(function(result) {
            if (result.data.length > 0) {
                $scope.abonosContables = result.data;
            }
        });
    }

    $scope.getCargoContable = function(idEmpresa, fInicial, fFinal) {
        conciliacionRepository.getCargoContable(idEmpresa, fInicial, fFinal).then(function(result) {
            if (result.data.length > 0) {
                $scope.cargosContables = result.data;
            }
        });
    }

    $scope.getCargoBancario = function(idEmpresa, fInicial, fFinal) {
        conciliacionRepository.getCargoBancario(idEmpresa, fInicial, fFinal).then(function(result) {
            if (result.data.length > 0) {
                $scope.cargosBancarios = result.data;
            }
        });
    }

    $scope.getAbonoBancario = function(idEmpresa, fInicial, fFinal) {
        conciliacionRepository.getAbonoBancario(idEmpresa, fInicial, fFinal).then(function(result) {
            if (result.data.length > 0) {
                $scope.abonosBancarios = result.data;
            }
        });
    }
    //   $scope.setActiveClass = function(currentTab) {
    //   	console.log(currentTab)
    //     for (var i = 0; i < $scope.panels.length; i++) {
    //         $scope.panels[i].active = false;
    //         $scope.panels[i].className = "";
    //     }
    //     currentTab.active = true;
    //     currentTab.className = "active";
    //     console.log(currentTab)
    // };
});