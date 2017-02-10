registrationModule.controller('conciliacionController', function($scope, $rootScope, $location, localStorageService, alertFactory, conciliacionRepository) {

    // ****************** Se guarda la información del usuario en variable userData
    $rootScope.userData = localStorageService.get('userData');

    // $scope.panels = [
    //        { name: 'Abonos Contables', active: true, className: 'active' },
    //        { name: 'Abonos Bancarios', active: false, className: '' },
    //        { name: 'Cargo Contable', active: false, className: '' },
    //        { name: 'Cargo Bancario', active: false, className: '' }
    //    ];

    $scope.init = function() {
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

        $scope.totalAbonoContable = 0;
        $scope.totalAbonoBancario = 0;
        $scope.totalCargoContable = 0;
        $scope.totalCargoBancario = 0;

        $scope.getAbonoContable(0, 0, 0, 1);
        $scope.getAbonoBancario(0, 0, 0, 1);
        $scope.getCargoContable(0, 0, 0, 1);
        $scope.getCargoBancario(0, 0, 0, 1);

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

    $scope.getAbonoContable = function(idEmpresa, fInicial, fFinal, opcion) {
        conciliacionRepository.getAbonoContable(idEmpresa, fInicial, fFinal, opcion).then(function(result) {
            if (result.data.length > 0) {
                $scope.abonosContables = result.data;
                $scope.resumenDPI = result.data;

                for (var i = 0, len = result.data.length; i < len; i++)
                    $scope.totalAbonoContable = $scope.totalAbonoContable + result.data[i].SALDO_ACTUAL;
            }
        });
    }

    $scope.getAbonoBancario = function(idEmpresa, fInicial, fFinal, opcion) {
        conciliacionRepository.getAbonoBancario(idEmpresa, fInicial, fFinal, opcion).then(function(result) {
            if (result.data.length > 0) {
                $scope.abonosBancarios = result.data;
                $scope.resumenDPI = result.data;

                for (var i = 0, len = result.data.length; i < len; i++)
                    $scope.totalAbonoBancario = $scope.totalAbonoBancario + result.data[i].SALDO_ACTUAL;
            }
        });
    }

    $scope.getCargoContable = function(idEmpresa, fInicial, fFinal, opcion) {
        conciliacionRepository.getCargoContable(idEmpresa, fInicial, fFinal, opcion).then(function(result) {
            if (result.data.length > 0) {
                $scope.cargosContables = result.data;

                for (var i = 0, len = result.data.length; i < len; i++)
                    $scope.totalCargoContable = $scope.totalCargoContable + result.data[i].SALDO_ACTUAL;
            }
        });
    }

    $scope.getCargoBancario = function(idEmpresa, fInicial, fFinal, opcion) {
        conciliacionRepository.getCargoBancario(idEmpresa, fInicial, fFinal, opcion).then(function(result) {
            if (result.data.length > 0) {
                $scope.cargosBancarios = result.data;

                for (var i = 0, len = result.data.length; i < len; i++)
                    $scope.totalCargoBancario = $scope.totalCargoBancario + result.data[i].SALDO_ACTUAL;                
            }
        });
    }

    //   $scope.setActiveClass = function(currentTab) {
    //      console.log(currentTab)
    //     for (var i = 0; i < $scope.panels.length; i++) {
    //         $scope.panels[i].active = false;
    //         $scope.panels[i].className = "";
    //     }
    //     currentTab.active = true;
    //     currentTab.className = "active";
    //     console.log(currentTab)
    // };
});
