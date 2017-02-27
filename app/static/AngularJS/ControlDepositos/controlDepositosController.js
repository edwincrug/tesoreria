registrationModule.controller('controlDepositosController', function($scope, $rootScope, $location, localStorageService, filtrosRepository,alertFactory, $http, $log, $timeout, uiGridConstants) {

    // ****************** Se guarda la información del usuario en variable userData
    $rootScope.userData = localStorageService.get('userData');
    $scope.idUsuario = 15;

    $scope.init = function() {
        $scope.getEmpresa($scope.idUsuario);
        
        $scope.calendario();

        $scope.activarBanco = true;
        $scope.activarCuenta = true;
        $scope.activarFechaIniDeposito = true;
        $scope.activarFechaFinDeposito = true;
        $scope.activarSucursal = true;
        $scope.activarDepartamento = true;
        $scope.activarFechaIniCartera = true;
        $scope.activarFechaFinCartera = true;
        $scope.activarBuscarDepositos = true;
        $scope.activarBuscarCartera = true;




        
        //$scope.getDepositosBancosNoReferenciados(1,1,'10/11/2015','31/12/2015');
        //$scope.getCarteraVencida(31996,4,12,67,'10/11/2015','31/12/2015');
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

    $scope.getEmpresa = function(idUsuario) {
        filtrosRepository.getEmpresas(idUsuario).then(function(result) {
            if (result.data.length > 0) {
                $scope.empresaUsuario = result.data;
            }
        });
    }

    $scope.empresaSeleccionada = function(idEmpresa) {
           
                $scope.activarBanco = true;
                $scope.activarSucursal = true;
                $scope.getSucursales(15,5);
                $scope.getBancos(idEmpresa);

        }


    $scope.getSucursales = function(idEmpresa) {

        $scope.activarSucursal = false;
        filtrosRepository.getSucursales($scope.idUsuario,idEmpresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.sucursalesUsuario = result.data;
            }
        });
    }

    $scope.getDepartamentos = function(idUsuario,idSucursal) {
        filtrosRepository.getDepartamentos(idUsuario,idSucursal).then(function(result) {
            if (result.data.length > 0) {
                $scope.departamentosUsuario = result.data;
            }
        });
    }

    $scope.getBancos = function(idEmpresa) {
        $scope.activarBanco = false;
        
        filtrosRepository.getBancos(idEmpresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.bancoEmpresa = result.data;
            }
        });
    }

    $scope.getCarteraVencida = function(cliente,empresa,sucursal,departamento,fechaIni,fechaFin){
      filtrosRepository.getCartera(cliente,empresa,sucursal,departamento,fechaIni,fechaFin).then(function(result) {
            if (result.data.length > 0) {
                $scope.gridCartera.data = result.data;
            }
        });
    }

     $scope.getDepositosBancosNoReferenciados = function(empresa,cuenta,fechaIni,fechaFin){
      filtrosRepository.getDepositosNoReferenciados(empresa,cuenta,fechaIni,fechaFin).then(function(result) {
            if (result.data.length > 0) {
               $scope.gridDocumentos.data = result.data;
            }
        });
    }

     var variablesInput = function() {
            $scope.activarBanco = true;
    }

    var empresaVacia = function() {
            $scope.filtros.idBanco = null;
            $scope.filtros.idCuenta = null;
            $scope.filtros.fechaInicioDeposito = null;
            $scope.filtros.fechaFinDeposito = null;
            $scope.activarCuenta = true;
            $scope.activarFechaIniDeposito = true;
            $scope.activarFechaFinDeposito = true;
            $scope.activarDepartamento = true;
            $scope.activarFechaIniCartera = true;
            $scope.activarFechaFinCartera = true;
            $scope.activarBuscarDepositos = true;
            $scope.activarBuscarCartera = true;
        }

    $scope.gridCartera = {
      enableColumnResize: true,
                enableRowSelection: true,
                enableGridMenu: true,
                enableFiltering: true,
                enableGroupHeaderSelection: false,
                treeRowHeaderAlwaysVisible: true,
                showColumnFooter: true,
                showGridFooter: true,
                height: 900,
                cellEditableCondition: function($scope) {
                    return $scope.row.entity.seleccionable;
                }
    };

  $scope.gridCartera.columnDefs = [
    { name: 'nombreSucursal', width: '10%',displayName: 'Sucursal'},
    { name: 'nombreDepartamento', width: '10%', displayName: 'Departamento'},
    { name: 'folio', width: '10%',displayName: 'Factura'},
    { name: 'fecha', width: '10%',displayName: 'fecha'},
    { name: 'nombreCliente', width: '30%',displayName: 'Cliente'},
    { name: 'importe', width: '10%',displayName: 'Importe',cellFilter: 'currency'},
    { name: 'saldo', width: '10%',displayName: 'Saldo',cellFilter: 'currency'},

  ];

  $scope.gridCartera.multiSelect = true;

   $scope.gridDocumentos = { 
    enableColumnResize: true,
                enableRowSelection: true,
                enableGridMenu: true,
                enableFiltering: true,
                enableGroupHeaderSelection: false,
                treeRowHeaderAlwaysVisible: true,
                showColumnFooter: true,
                showGridFooter: true,
                height: 900,
                cellEditableCondition: function($scope) {
                    return $scope.row.entity.seleccionable;
                }
     };

  $scope.gridDocumentos.columnDefs = [
    { name: 'banco',displayName: 'Banco', width: '10%' },
    { name: 'idBmer',displayName: 'Cons', width: '5%'},
    { name: 'referencia',displayName: 'Referencia', width: '15%' },
    { name: 'concepto' ,displayName: 'Concepto', width: '15%'},
    { name: 'fechaOperacion',displayName: 'Fecha', width: '10%',type: 'date', cellFilter: 'date:"dd/MM/yyyy"'},
    { name: 'cargo',displayName: 'Cargo', width: '10%', cellFilter: 'currency' },
    { name: 'abono' ,displayName: 'Abono', width: '10%', cellFilter: 'currency'},
    { name: 'observaciones'
    ,displayName: 'Observaciones'
    ,width: '25%'
    ,cellEditableCondition:true
    }
  ];

  $scope.gridDocumentos.multiSelect = false;
  $scope.gridDocumentos.modifierKeysToMultiSelect = false;
  $scope.gridDocumentos.noUnselect = true;
  $scope.gridDocumentos.onRegisterApi = function( gridApi ) {
    $scope.gridApi = gridApi;
  };

  $scope.toggleRowSelection = function() {
    $scope.gridApi.selection.clearSelectedRows();
    $scope.gridDocumentos.enableRowSelection = !$scope.gridDocumentos.enableRowSelection;
    $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.OPTIONS);
  };

 

});
