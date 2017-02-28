registrationModule.controller('controlDepositosController', function($scope, $rootScope, $location, localStorageService, filtrosRepository, alertFactory, $http, $log, $timeout, uiGridConstants, controlDepositosRepository) {

    // ****************** Se guarda la información del usuario en variable userData
    $rootScope.userData = localStorageService.get('userData');
    $scope.idUsuario = 15;

    $scope.filtros = {
        idEmpresa: '',
        idSucursal: '',
        idDepartamento: ''
    };

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
        $scope.activarBuscarCliente = true;
        $scope.depositoTotal = 0;
        $scope.carteraTotal = 0;
        //$scope.getDepositosBancosNoReferenciados(1,1,'10/11/2015','31/12/2015');
        //$scope.getCarteraVencida(31996,4,12,67,'10/11/2015','31/12/2015');
        $scope.filtroscheck = { cargo: 1 };
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
        $scope.getSucursales(15, 5);
        $scope.getBancos(idEmpresa);

    }


    $scope.getSucursales = function(idEmpresa) {

        $scope.activarSucursal = false;
        filtrosRepository.getSucursales($scope.idUsuario, idEmpresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.sucursalesUsuario = result.data;
            }
        });
    }

    $scope.getDepartamentos = function(idSucursal) {
        $scope.activarDepartamento = false;
        filtrosRepository.getDepartamentos($scope.idUsuario, idSucursal).then(function(result) {
            if (result.data.length > 0) {
                $scope.departamentosUsuario = result.data;
            }
        });
    }

    $scope.getBancos = function(idEmpresa) {
        $scope.activarBanco = false;
        $scope.cuentaBancaria =
            filtrosRepository.getBancos(idEmpresa).then(function(result) {
                if (result.data.length > 0) {
                    $scope.bancoEmpresa = result.data;
                }
            });
    }

    $scope.getCuentas = function(idBanco, idEmpresa) {

        $scope.activarCuenta = false;
        $scope.cuentaBancaria = [];
        filtrosRepository.getCuenta(idBanco, idEmpresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.cuentaBancaria = result.data;
            }
        });
    }

    $scope.getCarteraVencida = function(cliente, empresa, sucursal, departamento, fechaIni, fechaFin) {
        $scope.gridCartera.data = [];

        filtrosRepository.getCartera(cliente, empresa, sucursal, departamento, fechaIni, fechaFin).then(function(result) {
            if (result.data.length > 0) {
                $scope.gridCartera.data = result.data;
            }
        });
    }

    $scope.getDepositosBancosNoReferenciados = function(empresa, cuenta, fechaIni, fechaFin) {
        $scope.gridDocumentos.data = [];
        filtrosRepository.getDepositosNoReferenciados(empresa, cuenta, fechaIni, fechaFin).then(function(result) {
            if (result.data.length > 0) {
                $scope.gridDocumentos.data = result.data;
            }
        });
    }

    $scope.getCalendartios = function(idBanco, idEmpresa) {

        $scope.activarCuenta = false;

        filtrosRepository.getCuenta(idBanco, idEmpresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.cuentaBancaria = result.data;
            }
        });
    }

    $scope.empresaVacia = function() {

        $scope.filtros.idCuenta = null;
        $scope.filtros.fechaInicioDeposito = null;
        $scope.filtros.fechaFinDeposito = null;
        $scope.filtros.idDepartamento = null;
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
        $scope.gridCartera.data = [];
        $scope.gridDocumentos.data = [];
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
        { name: 'nombreSucursal', width: '10%', displayName: 'Sucursal' },
        { name: 'nombreDepartamento', width: '10%', displayName: 'Departamento' },
        { name: 'folio', width: '10%', displayName: 'Factura' },
        { name: 'fecha', width: '10%', displayName: 'fecha' },
        { name: 'nombreCliente', width: '30%', displayName: 'Cliente' },
        { name: 'importe', width: '10%', displayName: 'Importe', cellFilter: 'currency' },
        { name: 'saldo', width: '10%', displayName: 'Saldo', cellFilter: 'currency' },

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
        { name: 'banco', displayName: 'Banco', width: '10%' },
        { name: 'idBmer', displayName: 'Cons', width: '5%' },
        { name: 'referencia', displayName: 'Referencia', width: '15%' },
        { name: 'concepto', displayName: 'Concepto', width: '15%' },
        { name: 'fechaOperacion', displayName: 'Fecha', width: '10%', type: 'date', cellFilter: 'date:"dd/MM/yyyy"' },
        { name: 'cargo', displayName: 'Cargo', width: '10%', cellFilter: 'currency' },
        { name: 'abono', displayName: 'Abono', width: '10%', cellFilter: 'currency' }, {
            name: 'observaciones',
            displayName: 'Observaciones',
            width: '25%',
            cellEditableCondition: true
        }
    ];

    $scope.gridDocumentos.multiSelect = false;
    $scope.gridDocumentos.modifierKeysToMultiSelect = false;
    $scope.gridDocumentos.noUnselect = true;
    $scope.gridDocumentos.onRegisterApi = function(gridApi) {
        $scope.gridApi = gridApi;
    };

    $scope.toggleRowSelection = function() {
        $scope.gridApi.selection.clearSelectedRows();
        $scope.gridDocumentos.enableRowSelection = !$scope.gridDocumentos.enableRowSelection;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    };


    $scope.activa_calendariosDepositos = function() {
        $scope.activarFechaIniDeposito = false;
        $scope.activarFechaFinDeposito = false;
        $scope.activarBuscarDepositos = false;
    }

    $scope.activa_calendariosCartera = function() {
        $scope.activarFechaIniCartera = false;
        $scope.activarFechaFinCartera = false;
        $scope.activarBuscarCliente = false;
        $scope.activarBuscarCartera = false;
    }

    $scope.activa_BuscarCartera = function() {
        $scope.activarBuscarCartera = false;
    }


    $scope.selectedDocuments = [];
    $scope.selectedCartera = [];

    $scope.gridDocumentos.onRegisterApi = function(gridApi) {

        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            //var msg = 'row selected ' + row.isSelected;
            if (row.isSelected == true) {
                $scope.depositoTotal = row.entity.abono;
                $scope.selectedDocuments.shift();
                $scope.selectedDocuments.push(row.entity);
            } else if (row.isSelected == false) {
                $scope.selectedDocuments.shift();
            }
        }); //Este me dice cuales van siendo seleccionadas


    };

    $scope.gridCartera.onRegisterApi = function(gridApi) {

        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            var msg = 'row selected ' + row.isSelected;
            if (row.isSelected == true) {
                $scope.carteraTotal = $scope.carteraTotal + parseFloat(row.entity.importe);
                $scope.selectedCartera.push(row.entity);
            } else if (row.isSelected == false) {
                $scope.carteraTotal = $scope.carteraTotal - parseFloat(row.entity.importe);
            }
            //console.log(msg, 'Estoy en rowSelectionChanged');
        }); //Este me dice cuales van siendo seleccionadas
    };








    $scope.guardarGrid = function() {

        console.log('dffdsfsd');

        var params = $scope.setParamsCreateReference($scope.selectedCartera[0]);
        $scope.createReference(params);

    };



    $scope.setParamsCreateReference = function(obj) {

        var params = {};

        params.idEmpresa = $scope.filtros.idEmpresa;
        params.idSucursal = $scope.filtros.idSucursal;
        params.idDepartamento = 1; //$scope.filtros.idDepartamento;
        params.idTipoDocumento = 1; //siempre es uno segun gibi
        params.serie = obj.serie;
        params.folio = obj.idDocumento;
        params.idCliente = obj.idCliente;
        params.idAlma = 0;
        params.importeDocumento = obj.importe;
        params.idTipoReferencia = 3;

        return params;
    };



    $scope.setParamsInsertReferenceDetails = function(idreferencia, obj) {

        var params = {};

        params.idReferencia = idreferencia;
        params.idSucursal = $scope.filtros.idSucursal;
        params.idDepartamento = 1; //$scope.filtros.idDepartamento;
        params.idTipoDocumento = 1;
        params.serie = obj.serie;
        params.folio = obj.idDocumento;
        params.idCliente = obj.idCliente;
        params.idAlma = 0;
        params.importeDocumento = obj.importe;

        return params;
    };


    $scope.createReference = function(objData) {

        $scope.promise = controlDepositosRepository.createReference(objData).then(function(result) {
            if (result.data.length > 0) {

                var idRef = result.data[0].idReferencia;

                for (var i = 0; i < $scope.selectedCartera.length; i++) {
                    var params = $scope.setParamsInsertReferenceDetails(idRef, $scope.selectedCartera[i]);
                    $scope.insertReferenceDetails(params);
                };

            } else {
                console.log('no trajo nada');
            }
        }, function(error) {
            console.log('Error');
        });
    };



    $scope.insertReferenceDetails = function(objData) {

        $scope.promise = controlDepositosRepository.insertReferenceDetails(objData).then(function(result) {

            if (result.data.length > 0) {
                console.log('ok');
            } else {
                console.log('no trajo nada');
            }
        }, function(error) {
            console.log('Error');
        });
    };
















});
