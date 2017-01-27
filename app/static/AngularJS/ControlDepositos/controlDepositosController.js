registrationModule.controller('controlDepositosController', function($scope, $rootScope, $location, localStorageService, filtrosRepository,alertFactory, $http, $log, $timeout, uiGridConstants) {

    // ****************** Se guarda la información del usuario en variable userData
    $rootScope.userData = localStorageService.get('userData');
    $scope.idUsuario = 15;

    $scope.init = function() {
        $scope.getEmpresa($scope.idUsuario);
        $scope.dato = "0000";
        $scope.getDepositosBancos(4,1,'10/11/2015','31/12/2015');
        $scope.getAuxiliarContable('192.168.20.9','GAZM_ZARAGOZA','10/11/2015','31/12/2015');
    }

    $scope.getEmpresa = function(idUsuario) {
        filtrosRepository.getEmpresas(idUsuario).then(function(result) {
            if (result.data.length > 0) {
                $scope.empresaUsuario = result.data;
            }
        });
    }

    $scope.getSucursales = function(idUsuario, idEmpresa) {
        filtrosRepository.getEmpresas(idUsuario,idEmpresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.sucursalesUsuario = result.data;
            }
        });
    }

    $scope.getDepartamentos = function(idUsuario,idSucursal) {
        filtrosRepository.getEmpresas(idUsuario).then(function(result) {
            if (result.data.length > 0) {
                $scope.departamentosUsuario = result.data;
            }
        });
    }

    $scope.getBancos = function(idBanco) {
        filtrosRepository.getBancos(idBanco).then(function(result) {
            if (result.data.length > 0) {
                $scope.bancoEmpresa = result.data;
            }
        });
    }

    $scope.getAuxiliarContable = function(server,database,fechaIni,fechaFin){
      filtrosRepository.getAuxiliar(server,database,fechaIni,fechaFin).then(function(result) {
            if (result.data.length > 0) {
                //$scope.listAuxiliarContable = result.data;
                $scope.gridAuxiliar.data = result.data;
            }
        });
    }

     $scope.getDepositosBancos = function(empresa,cuenta,fechaIni,fechaFin){
      filtrosRepository.getDepositos(empresa,cuenta,fechaIni,fechaFin).then(function(result) {
            if (result.data.length > 0) {
                //$scope.listAuxiliarContable = result.data;
                $scope.gridDocumentos.data = result.data;
            }
        });
    }


    $scope.gridAuxiliar = {
      enableRowSelection: true,
      enableSelectAll: true,
      selectionRowHeaderWidth: 35,
      rowHeight: 35,
      showGridFooter:true
    };

  $scope.gridAuxiliar.columnDefs = [
    { name: 'CONCEPTO',displayName: 'Concepto', width: '20%' },
    { name: 'NUMERO_CUENTA', displayName: 'Numero de cuenta',width: '20%'},
    { name: 'FECHA', width: '20%',displayName: 'Fecha' },
    { name: 'ABONO', width: '40%',displayName: 'Abono',cellFilter: 'currency'}
  ];

  $scope.gridAuxiliar.multiSelect = true;

  
    $scope.info = {};

    $scope.toggleMultiSelect = function() {
      $scope.gridApi.selection.setMultiSelect(!$scope.gridApi.grid.options.multiSelect);
    };

    $scope.toggleModifierKeysToMultiSelect = function() {
      $scope.gridApi.selection.setModifierKeysToMultiSelect(!$scope.gridApi.grid.options.modifierKeysToMultiSelect);
    };

    $scope.selectAll = function() {
      $scope.gridApi.selection.selectAllRows();
    };

    $scope.clearAll = function() {
      $scope.gridApi.selection.clearSelectedRows();
    };

    $scope.toggleRow1 = function() {
      $scope.gridApi.selection.toggleRowSelection($scope.gridAuxiliar.data[0]);
    };

    $scope.toggleFullRowSelection = function() {
      $scope.gridAuxiliar.enableFullRowSelection = !$scope.gridAuxiliar.enableFullRowSelection;
      $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.OPTIONS);
    };

    $scope.setSelectable = function() {
      $scope.gridApi.selection.clearSelectedRows();

      $scope.gridAuxiliar.isRowSelectable = function(row){
        if(row.entity.age > 30){
          return false;
        } else {
          return true;
        }
      };
      $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);

      $scope.gridAuxiliar.data[0].age = 31;
      $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.EDIT);
    };

    $scope.gridAuxiliar.onRegisterApi = function(gridApi){
      //set gridApi on scope
      $scope.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        var msg = 'row selected ' + row.isSelected;
        $log.log(msg);
      });

      gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
        var msg = 'rows changed ' + rows.length;
        $log.log(msg);
      });
    };


  $scope.gridDocumentos = { enableRowSelection: true, enableRowHeaderSelection: false };

  $scope.gridDocumentos.columnDefs = [
    { name: 'banco',displayName: 'Banco', width: '20%' },
    { name: 'concepto',displayName: 'Concepto', width: '20%'},
    { name: 'importe',displayName: 'Importe', width: '20%' },
    { name: 'fechaOperacion' ,displayName: 'Fecha', width: '20%'}
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
