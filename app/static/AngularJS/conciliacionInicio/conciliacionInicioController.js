registrationModule.controller('conciliacionInicioController', function($scope, $rootScope, $location, $timeout, $log, localStorageService, filtrosRepository, conciliacionInicioRepository, alertFactory, uiGridConstants) {

    // ****************** Se guarda la información del usuario en variable userData
    $rootScope.userData = localStorageService.get('userData');
    $scope.nodoPadre = [];
    //*******************Se inician variables
    // $scope.gridDepositosBancos = '';
    // $scope.gridAuxiliarContable = '';
    // $scope.gridAuxiliarContablePunteado = '';
    // $scope.gridDepositosBancosPunteado = '';
    $scope.auxiliar = true;
    $scope.bancos = false;

    $scope.init = function() {
        //$scope.calendario();
        $scope.getEmpresa(15);
        $scope.getBancos(1);
        $scope.getCuentaBanco(1)
        $scope.getClaveBanco(1)
        $scope.getCuentacontable(1)
        $scope.getDepositosBancos(1);
        $scope.getAuxiliarContable(4,'1100-0070-0001-0005');
        // if($rootScope.userData == null){
        //  location.href = '/';
        //  alertFactory.warning('Inicie Sesión')
        // }else{
        //  alertFactory.success('Bienvenido '+ $rootScope.userData.nombreUsuario)
        // }
        $rootScope.mostrarMenu = 1;
    }

    $scope.getEmpresa = function(idUsuario) {
        filtrosRepository.getEmpresas(idUsuario).then(function(result) {
            if (result.data.length > 0) {
                $scope.empresaUsuario = result.data;
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

    $scope.getCuentaBanco = function(idCuentaBanco) {
        filtrosRepository.getCuentaBanco(idCuentaBanco).then(function(result) {
            if (result.data.length > 0) {
                $scope.bancoCuenta = result.data;
            }
        });
    }

    $scope.getClaveBanco = function(idClaveBanco) {
        filtrosRepository.getClaveBanco(idClaveBanco).then(function(result) {
            if (result.data.length > 0) {
                $scope.bancoClave = result.data;
            }
        });
    }

    $scope.getCuentacontable = function(idCuentacontable) {
        filtrosRepository.getCuentacontable(idCuentacontable).then(function(result) {
            if (result.data.length > 0) {
                $scope.cuentacontable = result.data;
            }
        });
    }

    $scope.getAuxiliarContable = function(idEmpresa, numero_cuenta) {
        $('#tblAuxiliar').DataTable().destroy();
        filtrosRepository.getAuxiliar(idEmpresa, numero_cuenta).then(function(result) {
            if (result.data.length > 0) {
                $scope.auxiliarContable = result.data;
                console.log($scope.auxiliarContable, 'Auxiliar');
                $scope.gridAuxiliarContable.data = result.data;

            }
        });
    }

    $scope.getDepositosBancos = function(idBanco) {
        $('#tblDepositos').DataTable().destroy();
        filtrosRepository.getDepositos(idBanco).then(function(result) {
            if (result.data.length > 0) {
                $scope.depositosBancos = result.data;
                console.log($scope.depositosBancos, 'Banco')
                $scope.gridDepositosBancos.data = result.data;
            }
        });
    }

    $scope.datosss = function(obj) {
            console.log(obj)
        }
        //**************************************************************************************************
        // INICIA Genera el pdf 
        //**************************************************************************************************
    $scope.generarReporte = function() {
            $('#loading').modal('show');
            var infReporte = '';
            var jsonData = '';
            var ruta = '';
            infReporte = {
                "titulo": "CONCILIACIÓN BANCARIA",
                "titulo2": "BANCOS",
                "titulo3": "FA04",
                "empresa": "ANDRADE UNIVERSIDAD, S.A DE C.V.",
                "fechaElaboracion": "31/12/2016",
                "conciliacionBancaria": "BANCOMER",
                "chequera": "31/12/2016",
                "bancoCuenta": "195334667",
                "clabe": "01218000 195334667",
                "cuentaContable": "1100-0020-0001-0001",
                "estadoCuenta": "407480.53",
                "aCB": "35525.00",
                "aBC": "-",
                "cBC": "-",
                "cCB": "64009.63",
                "saldoConciliacion": "435965.15",
                "saldoContabilidad": "435965.15",
                "diferencia": "0.00",
                "menosBanco": [{
                        "fecha": "30/12/2016",
                        "poliza": "UNI - EGRESOS",
                        "noPoliza": "399",
                        "concepto": "22638 - TANIA ANGELICA RAMIREZ PALMA",
                        "parcial": " ",
                        "total": "500.00"
                    },

                    {
                        "fecha": "30/12/2016",
                        "poliza": "UNI - EGRESOS",
                        "noPoliza": "400",
                        "concepto": "23192 - DEYANIRA PEREZ SANCHEZ",
                        "parcial": " ",
                        "total": "5000.00"
                    },

                    {
                        "fecha": "30/12/2016",
                        "poliza": "UNI - EGRESOS",
                        "noPoliza": "401",
                        "concepto": "23084 - JORGE ALEJANDRO VALDES YAÑEZ",
                        "parcial": " ",
                        "total": "5000.00"
                    },

                    {
                        "fecha": "30/12/2016",
                        "poliza": "UNI - EGRESOS",
                        "noPoliza": "402",
                        "concepto": "22814 - JHONATAN PANTOJA RIOJAS",
                        "parcial": " ",
                        "total": "5000.00"
                    },

                    {
                        "fecha": "30/12/2016",
                        "poliza": "UNI - EGRESOS",
                        "noPoliza": "403",
                        "concepto": "23131 - LUIS RODRIGUEZ LUNA",
                        "parcial": " ",
                        "total": "10025.00"
                    },

                    {
                        "fecha": "30/12/2016",
                        "poliza": "UNI - EGRESOS",
                        "noPoliza": "404",
                        "concepto": "22284 - MARIA MAGDALENA GUZMAN TERRAZAS",
                        "parcial": " ",
                        "total": "10000.00"
                    }
                ],
                "masContabilidad": [{
                    "fecha": " ",
                    "poliza": " ",
                    "noPoliza": " ",
                    "concepto": " ",
                    "parcial": " ",
                    "total": " "
                }],
                "menosContabilidad": [{
                    "fecha": " ",
                    "poliza": " ",
                    "noPoliza": " ",
                    "concepto": " ",
                    "parcial": " ",
                    "total": " "
                }],
                "masBanco": [{
                    "fecha": "30/12/2016",
                    "poliza": "PED.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "118",
                    "concepto": "TRANSFERIR INGRESOS DE CAJA/DB000012224/03- TARJETA DE CRÉDITO/BANCOMER1292",
                    "parcial": "",
                    "total": "1065.00"
                }, {
                    "fecha": "30/12/2016",
                    "poliza": "PED.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "118",
                    "concepto": "TRANSFERIR INGRESOS DE CAJA/FB000002653/03- TARJETA DE CRÉDITO/BANCOMER0673",
                    "parcial": "",
                    "total": "180.00"
                }, {
                    "fecha": "30/12/2016",
                    "poliza": "UNI.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "122",
                    "concepto": "TRANSFERIR INGRESOS DE CAJA/6765/03- TARJETA DE CRÉDITO/2834BBVA",
                    "parcial": "",
                    "total": "12061.10"
                }, {
                    "fecha": "30/12/2016",
                    "poliza": "CUA.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "80",
                    "concepto": "RANSFERIR INGRESOS DE CAJA/DC000005913/03- TARJETA DE CRÉDITO/TCRBBV4336",
                    "parcial": "",
                    "total": "2755.00"
                }, {
                    "fecha": "30/12/2016",
                    "poliza": "CUA.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "80",
                    "concepto": "RANSFERIR INGRESOS DE CAJA/DC000005917/03- TARJETA DE CRÉDITO/TCR BBVA 7132",
                    "parcial": "",
                    "total": "4650.00"
                }, {
                    "fecha": "30/12/2016",
                    "poliza": "CUA.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "80",
                    "concepto": "RANSFERIR INGRESOS DE CAJA/DC000005921/03- TARJETA DE CRÉDITO/TCR BBVA 2884",
                    "parcial": "",
                    "total": "10000.00"
                }, {
                    "fecha": "30/12/2016",
                    "poliza": "CUA.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "80",
                    "concepto": "RANSFERIR INGRESOS DE CAJA/DC000005922/03- TARJETA DE CRÉDITO/TCR BBVA 3332",
                    "parcial": "",
                    "total": "1590.00"
                }, {
                    "fecha": "30/12/2016",
                    "poliza": "CUA.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "80",
                    "concepto": "RANSFERIR INGRESOS DE CAJA/DC000005909/03- TARJETA DE CRÉDITO/TCR BBVA 5988",
                    "parcial": "",
                    "total": "1065.00"
                }, {
                    "fecha": "30/12/2016",
                    "poliza": "CUA.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "80",
                    "concepto": "RANSFERIR INGRESOS DE CAJA/DC000005908/03- TARJETA DE DÉBITO/TDB BBVA 4106",
                    "parcial": "",
                    "total": "2573.00"
                }, {
                    "fecha": "30/12/2016",
                    "poliza": "CUA.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "80",
                    "concepto": "RANSFERIR INGRESOS DE CAJA/FC000002304/03- TARJETA DE DÉBITO/TDB BBVA 3236",
                    "parcial": "",
                    "total": "319.00"
                }, {
                    "fecha": "30/12/2016",
                    "poliza": "CUA.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "80",
                    "concepto": "RANSFERIR INGRESOS DE CAJA/DC000005918/03- TARJETA DE DÉBITO/TDB BBVA 1105",
                    "parcial": "",
                    "total": "3070.00"
                }, {
                    "fecha": "30/12/2016",
                    "poliza": "CUA.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "80",
                    "concepto": "RANSFERIR INGRESOS DE CAJA/DC000005912/03- TARJETA DE DÉBITO/TDB BBVA 6650",
                    "parcial": "",
                    "total": "1379.00"
                }, {
                    "fecha": "30/12/2016",
                    "poliza": "CUA.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "80",
                    "concepto": "RANSFERIR INGRESOS DE CAJA/DC000005915/03- TARJETA DE DÉBITO/TDB BBVA 8098",
                    "parcial": "",
                    "total": "4020.00"
                }, {
                    "fecha": "30/12/2016",
                    "poliza": "CUA.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "80",
                    "concepto": "RANSFERIR INGRESOS DE CAJA/FC000002306/03- TARJETA DE DÉBITO/TDB BBVA 8098",
                    "parcial": "",
                    "total": "548.54"
                }, {
                    "fecha": "30/12/2016",
                    "poliza": "CUA.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "80",
                    "concepto": "RANSFERIR INGRESOS DE CAJA/DC000005916/03- TARJETA DE DÉBITO/TDB BBVA 3758",
                    "parcial": "",
                    "total": "8134.99"
                }, {
                    "fecha": "30/12/2016",
                    "poliza": "CUA.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "80",
                    "concepto": "RANSFERIR INGRESOS DE CAJA/MM000005854/03- TARJETA DE DÉBITO/TDB BBVA 2813",
                    "parcial": "",
                    "total": "10000.00"
                }, {
                    "fecha": "30/12/2016",
                    "poliza": "CUA.- TRASPASO DE SALDO INGRESOS",
                    "noPoliza": "80",
                    "concepto": "RANSFERIR INGRESOS DE CAJA/FC000002302/03- TARJETA DE DÉBITO/TDB BBVA 1868",
                    "parcial": "",
                    "total": "598.99"
                }],
                "firmas": [{
                    "titulo": "ELABORÓ",
                    "nombre": "CARLA HERNÁNDEZ RODRÍGUEZ",
                    "fecha": ""
                }, {
                    "titulo": "GERENTE ADMINISTRATIVO",
                    "nombre": "GUADALUPE HERNÁNDEZ MEJÍA",
                    "fecha": ""
                }, {
                    "titulo": "CONTADOR",
                    "nombre": "DAVID VÁZQUEZ RICO",
                    "fecha": ""
                }]
            }

            jsonData = {
                "template": {
                    "name": "tesoreria_rpt"
                },
                "data": infReporte
            }
            conciliacionInicioRepository.getReportePdf(jsonData).then(function(fileName) {
                setTimeout(function() {
                    $("#objReportePdf").remove();
                    //window.open("http://192.168.20.9:5000/api/layout/viewpdf?fileName=" + fileName.data);
                    ruta = fileName.data;
                    console.log(fileName.data);
                    $("<object id='objReportePdf' class='filesInvoce' data='http://192.168.20.9:5000/api/layout/viewpdf?fileName=" + ruta + "' width='100%' height='500px' >").appendTo('#reportePdf');
                    $('#loading').modal('hide');
                    $('#reproteModalPdf').modal('show');
                }, 5000);

            });
        }
        //**************************************************************************************************
        // TERMINA Genera el pdf 
        //**************************************************************************************************    

    $scope.setTablePaging = function(idTable) {
        $('#' + idTable).DataTable({
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [{
                // customize: function(win) {
                //     $(win.document.body).addClass('white-bg');
                //     $(win.document.body).css('font-size', '10px');
                //     $(win.document.body).find('table')
                //         .addClass('compact')
                //         .css('font-size', 'inherit');
                // }
            }]
        });
    };
    //****************************************************************************************************
    // INICIA la configuración del GRID AUXILIAR CONTABLE
    //****************************************************************************************************
    $scope.gridAuxiliarContable = {
        enableRowSelection: true,
        enableSelectAll: true,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        showGridFooter: true
    };

    $scope.gridAuxiliarContable.columnDefs = [
        { name: 'FECHA', displayName: 'Fecha', width: '20%' },
        { name: 'TIPO', displayName: 'Tipo Pol', width: '40%' },
        { name: 'POLIZA', displayName: 'No Pol', width: '12%' },
        { name: 'CONCEPTO', displayName: 'Concepto', width: '20%' },
        { name: 'CARGO', displayName: 'Cargo', width: '20%', cellFilter: 'currency' },
        { name: 'ABONO', displayName: 'Abono', width: '20%', cellFilter: 'currency' }
    ];

    $scope.gridAuxiliarContable.multiSelect = true;

    $scope.gridAuxiliarContable.onRegisterApi = function(gridApi) {
        //set gridApi on scope
        $scope.gridApiAuxiliar = gridApi;
        // gridApi.selection.on.rowSelectionChanged($scope, function(row) {
        //     var msg = 'row selected ' + row.isSelected;
        //     console.log(msg, 'Estoy en rowSelectionChanged');
        // }); //Este me dice cuales van siendo seleccionadas

        gridApi.selection.on.rowSelectionChangedBatch($scope, function(rows) {
            var msg = 'rows changed ' + rows.length;
            console.log(msg, 'Estoy en rowSelectionChangedBatch', rows);
            angular.forEach(rows, function(value, key) {
                $scope.gridAuxiliarContablePunteado.data[key] = value.entity;
            });
        });
    };
    //****************************************************************************************************
    // INICIO la configuración del GRID BANCOS
    //****************************************************************************************************
    $scope.gridDepositosBancos = {
        enableRowSelection: true,
        enableSelectAll: true,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        showGridFooter: true
    };

    $scope.gridDepositosBancos.columnDefs = [
        { name: 'banco', displayName: 'Banco', width: '20%' },
        { name: 'referencia', displayName: 'Referencia', width: '20%' },
        { name: 'concepto', displayName: 'Concepto', width: '40%' },
        { name: 'esCargo', displayName: 'Cargo', width: '20%', cellFilter: 'currency' },
        { name: 'importe', displayName: 'Abono', width: '20%', cellFilter: 'currency' }
    ];

    $scope.gridDepositosBancos.multiSelect = true;

    $scope.gridDepositosBancos.onRegisterApi = function(gridApi) {
        //set gridApi on scope
        $scope.gridApiBancos = gridApi;
        // gridApi.selection.on.rowSelectionChanged($scope, function(row) {
        //     var msg = 'row selected ' + row.isSelected;
        //     console.log(msg, 'Estoy en rowSelectionChanged');
        // });//Este me dice cuales van siendo seleccionadas

        gridApi.selection.on.rowSelectionChangedBatch($scope, function(rows) {
            var msg = 'rows changed ' + rows.length;
            console.log(msg, 'Estoy en rowSelectionChangedBatch', rows);
            angular.forEach(rows, function(value, key) {
                $scope.gridDepositosBancosPunteado.data[key] = value.entity;
            });
        });
    };
    //****************************************************************************************************
    // INICIA la configuración del GRID AUXILIAR CONTABLE pero con PUNTEO
    //****************************************************************************************************
    $scope.gridAuxiliarContablePunteado = {
        enableRowSelection: true,
        enableSelectAll: true,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        showGridFooter: true
    };

    $scope.gridAuxiliarContablePunteado.columnDefs = [
        { name: 'FECHA', displayName: 'Fecha', width: '20%' },
        { name: 'TIPO', displayName: 'Tipo Pol', width: '40%' },
        { name: 'POLIZA', displayName: 'No Pol', width: '12%' },
        { name: 'CONCEPTO', displayName: 'Concepto', width: '20%' },
        { name: 'CARGO', displayName: 'Cargo', width: '20%', cellFilter: 'currency' },
        { name: 'ABONO', displayName: 'Abono', width: '20%', cellFilter: 'currency' }
    ];

    $scope.gridAuxiliarContablePunteado.multiSelect = false;
    //****************************************************************************************************
    // INICIO la configuración del GRID BANCOS pero con PUNTEO
    //****************************************************************************************************
    $scope.gridDepositosBancosPunteado = {
        enableRowSelection: true,
        enableSelectAll: true,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        showGridFooter: true
    };

    $scope.gridDepositosBancosPunteado.columnDefs = [
        { name: 'banco', displayName: 'Banco', width: '20%' },
        { name: 'referencia', displayName: 'Referencia', width: '20%' },
        { name: 'concepto', displayName: 'Concepto', width: '40%' },
        { name: 'esCargo', displayName: 'Cargo', width: '20%', cellFilter: 'currency' },
        { name: 'importe', displayName: 'Abono', width: '20%', cellFilter: 'currency' }
    ];

    $scope.gridDepositosBancosPunteado.multiSelect = false;
    //****************************************************************************************************
    // INICIA guarda los grid elegidos de auxiliar y banco
    //****************************************************************************************************
    $scope.GuardarGrid = function() {
            $scope.gridApiBancos.selection.clearSelectedRows();
            $scope.gridApiAuxiliar.selection.clearSelectedRows();
        }
        //****************************************************************************************************
        // TERMINA guarda los grid elegidos de auxiliar y banco
        //****************************************************************************************************


    //Lo que me robe  



    // $scope.toggleMultiSelect = function() {
    //     $scope.gridApi.selection.setMultiSelect(!$scope.gridApi.grid.options.multiSelect);
    // };

    // $scope.toggleModifierKeysToMultiSelect = function() {
    //     $scope.gridApi.selection.setModifierKeysToMultiSelect(!$scope.gridApi.grid.options.modifierKeysToMultiSelect);
    // };

    // $scope.selectAll = function() {
    //     $scope.gridApi.selection.selectAllRows();
    // };

    // $scope.clearAll = function() {
    //     $scope.gridApi.selection.clearSelectedRows();
    // };

    // $scope.toggleRow1 = function() {
    //     $scope.gridApi.selection.toggleRowSelection($scope.gridAuxiliarContable.data[0]);
    // };

    // $scope.toggleFullRowSelection = function() {
    //     $scope.gridAuxiliarContable.enableFullRowSelection = !$scope.gridAuxiliarContable.enableFullRowSelection;
    //     $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    // };

    // $scope.setSelectable = function() {
    //     $scope.gridApi.selection.clearSelectedRows();

    //     $scope.gridAuxiliarContable.isRowSelectable = function(row) {
    //         if (row.entity.age > 30) {
    //             return false;
    //         } else {
    //             return true;
    //         }
    //     };
    //     $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);

    //     $scope.gridAuxiliarContable.data[0].age = 31;
    //     $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.EDIT);
    // };



    //????????????????????????????????????????????????

});
