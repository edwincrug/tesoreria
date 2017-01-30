registrationModule.controller('conciliacionController', function ($scope, $rootScope, $location, localStorageService,alertFactory) {

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


		$scope.aboContaBanco = [{"fecha":"13/01/2017","tipoPol":"UNI-EGRESOS","noPol":"728","concepto":"3210 - TANIA ANGELICA RAMIREZ PALMA","total":"47000"},
					   			{"fecha":"07/01/2017","tipoPol":"UNI-EGRESOS","noPol":"821","concepto":"8298 - LAURA CASTILLO ALVARADO","total":"800"},
					   			{"fecha":"21/01/2017","tipoPol":"UNI-EGRESOS","noPol":"914","concepto":"5392 - MONICA LOPEZ LEON","total":"2300"}];

	    $scope.cargBancoConta = [{"fecha":"13/01/2017","tipoPol":"UNI-EGRESOS","noPol":"728","concepto":"3210 - TANIA ANGELICA RAMIREZ PALMA","total":"47000"},					   			
					   			{"fecha":"21/01/2017","tipoPol":"UNI-EGRESOS","noPol":"914","concepto":"5392 - MONICA LOPEZ LEON","total":"23000"}];

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