registrationModule.controller('conciliacionInicioController', function($scope, $rootScope, $location, $timeout, $log, localStorageService, filtrosRepository, conciliacionInicioRepository, alertFactory, uiGridConstants, i18nService, uiGridGroupingConstants) {

    // ****************** Se guarda la información del usuario en variable userData
    $rootScope.userData = localStorageService.get('userData');
    $scope.nodoPadre = [];
    $scope.abonoAuxiliar = 0;
    $scope.cargoAuxiliar = 0;
    $scope.abonoBanco = 0;
    $scope.cargoBanco = 0;
    $scope.auxiliarPadre = '';
    $scope.bancoPadre = '';
    i18nService.setCurrentLang('es'); //Para seleccionar el idioma
    //****************************************************************************************************
    // INICIA las variables para el GRID AUXILIAR CONTABLE
    //****************************************************************************************************
    $scope.gridAuxiliarContable = {
        enableRowSelection: true,
        enableSelectAll: true,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        showGridFooter: true,
        //showColumnFooter: true
    };
    $scope.gridAuxiliarContable.columnDefs = [
        { name: 'FECHA', displayName: 'Fecha', width: '10%' },
        { name: 'TIPO', displayName: 'Tipo Pol', width: '20%' },
        { name: 'POLIZA', displayName: 'No Pol', width: '15%' },
        { name: 'CONCEPTO', displayName: 'Concepto', width: '25%' },
        { name: 'CARGO', displayName: 'Cargo', width: '15%', cellFilter: 'currency' },
        { name: 'ABONO', displayName: 'Abono', width: '15%', cellFilter: 'currency' }
        //{ name: 'CONCEPTO', displayName: 'Concepto', width: '25%', footerCellTemplate: '<div class="ui-grid-cell-contents" style="color: blue">Total</div>' },
        //{ name: 'CARGO', displayName: 'Cargo', width: '15%', cellFilter: 'currency', footerCellTemplate: '<div class="ui-grid-cell-contents" ng-controller="conciliacionInicioController" >{{abonoAuxiliar | currency}}</div>' },
        //{ name: 'ABONO', displayName: 'Abono', width: '15%', cellFilter: 'currency', aggregationType: uiGridConstants.selection }
    ];
    $scope.gridAuxiliarContable.multiSelect = true;
    //****************************************************************************************************
    // INICIA las variables para el GRID BANCOS
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
        { name: 'concepto', displayName: 'Concepto', width: '20%' },
        { name: 'cargo', displayName: 'Cargo', width: '20%', cellFilter: 'currency' },
        { name: 'abono', displayName: 'Abono', width: '20%', cellFilter: 'currency' }
    ];
    $scope.gridDepositosBancos.multiSelect = true;
    //****************************************************************************************************
    // INICIA 
    //****************************************************************************************************

    $scope.init = function() {
        //$scope.calendario();
        $scope.getEmpresa(15);
        $scope.getBancos(1);
        $scope.getCuentaBanco(1)
        $scope.getClaveBanco(1)
        $scope.getCuentacontable(1)
        $scope.getDepositosBancos(1, 1);
        $scope.getAuxiliarContable(1, '1100-0072-0001-0010', 1);
        $scope.getAuxiliarPunteo(1);
        $scope.getBancoPunteo(1);
        $scope.tabla();
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

    $scope.getAuxiliarContable = function(idEmpresa, numero_cuenta, idestatus) {

        if (idestatus == 1) { //Consigo los datos del Auxiliar Contable sin puntear
            filtrosRepository.getAuxiliar(idEmpresa, numero_cuenta, idestatus).then(function(result) {
                if (result.data.length > 0) {
                    $scope.auxiliarContable = result.data;
                    $scope.gridAuxiliarContable.data = result.data;
                }
            });
        } else if (idestatus == 2) { //consigo los datos el Auxiliar Contable Punteado
            filtrosRepository.getAuxiliar(idEmpresa, numero_cuenta, idestatus).then(function(result) {
                if (result.data.length > 0) {
                    $scope.auxiliarContable = result.data;
                }
            });
        }

    }

    $scope.getDepositosBancos = function(idBanco, idestatus) {
        if (idestatus == 1) { //Consigo los datos del Banco sin Puntear
            filtrosRepository.getDepositos(idBanco, idestatus).then(function(result) {
                if (result.data.length > 0) {
                    $scope.depositosBancos = result.data;
                    $scope.gridDepositosBancos.data = result.data;
                }
            });
        } else if (idestatus == 2) { //Consigo los datos del banco Punteado
            filtrosRepository.getDepositos(idBanco, idestatus).then(function(result) {
                if (result.data.length > 0) {
                    $scope.depositosBancos = result.data;
                }
            });
        }
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
    $scope.gridAuxiliarContable.onRegisterApi = function(gridApi) {
        //set gridApi on scope
        $scope.gridApiAuxiliar = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            var msg = 'row selected ' + row.isSelected;
            if (row.isSelected == true) {
                $scope.abonoAuxiliar = $scope.abonoAuxiliar + row.entity.ABONO;
                $scope.cargoAuxiliar = $scope.cargoAuxiliar + row.entity.CARGO;
            } else if (row.isSelected == false) {
                $scope.abonoAuxiliar = $scope.abonoAuxiliar - row.entity.ABONO;
                $scope.cargoAuxiliar = $scope.cargoAuxiliar - row.entity.CARGO;
            }
            console.log(msg, 'Estoy en rowSelectionChanged');
        }); //Este me dice cuales van siendo seleccionadas

        gridApi.selection.on.rowSelectionChangedBatch($scope, function(rows) {
            var msg = 'rows changed ' + rows.length;
            console.log(msg, 'Estoy en rowSelectionChangedBatch', rows);
            angular.forEach(rows, function(value, key) {
                $scope.punteoAuxiliar[key] = value.entity;
            });
        });
    };
    //****************************************************************************************************
    // INICIO la configuración del GRID BANCOS
    //**************************************************************************************************** 
    $scope.gridDepositosBancos.onRegisterApi = function(gridApi) {
        //set gridApi on scope
        $scope.gridApiBancos = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            var msg = 'row selected ' + row.isSelected;
            if (row.isSelected == true) {
                $scope.abonoBanco = $scope.abonoBanco + row.entity.abono;
                $scope.cargoBanco = $scope.cargoBanco + row.entity.cargo;
            } else if (row.isSelected == false) {
                $scope.abonoBanco = $scope.abonoBanco - row.entity.abono;
                $scope.cargoBanco = $scope.cargoBanco - row.entity.cargo;
            }
            console.log(msg, 'Estoy en rowSelectionChanged');

        }); //Este me dice cuales van siendo seleccionadas

        gridApi.selection.on.rowSelectionChangedBatch($scope, function(rows) {
            var msg = 'rows changed ' + rows.length;
            console.log(msg, 'Estoy en rowSelectionChangedBatch', rows);
            angular.forEach(rows, function(value, key) {
                $scope.punteoBanco[key] = value.entity;
            });
        });
    };
    //****************************************************************************************************
    // INICIA guarda los grid elegidos de auxiliar y banco
    //****************************************************************************************************
    $scope.GuardarGrid = function() {
        $scope.punteoAuxiliar = [];
        $scope.punteoBanco = [];
        $scope.gridApiBancos.selection.clearSelectedRows();
        $scope.gridApiAuxiliar.selection.clearSelectedRows();
        if ($scope.punteoAuxiliar.length > 0 && $scope.punteoBanco.length > 0) {
            if ($scope.punteoAuxiliar.length == 1) {
                angular.forEach($scope.punteoAuxiliar, function(value, key) {
                    var valueAuxiliar = value.idAuxiliarContable;
                    angular.forEach($scope.punteoBanco, function(value, key) {
                        console.log(valueAuxiliar, value.idDepositoBanco);
                        conciliacionInicioRepository.insertPuntoDeposito(value.idDepositoBanco, valueAuxiliar, '', 2, 2).then(function(result) {
                            console.log(result.data);
                            if (result.data[0].length) {
                                console.log('Respuesta Incorrecta');
                            } else {
                                console.log('Respuesta Correcta');
                            }
                        })
                    });
                });

                $scope.abonoAuxiliar = 0;
                $scope.cargoAuxiliar = 0;
                $scope.abonoBanco = 0;
                $scope.cargoBanco = 0;
                $scope.getDepositosBancos(1, 1);
                $scope.getAuxiliarContable(1, '1100-0072-0001-0010', 1);
                $scope.getAuxiliarPunteo(1);
                $scope.getBancoPunteo(1);
            } else if ($scope.punteoBanco.length == 1) {
                angular.forEach($scope.punteoAuxiliar, function(value, key) {
                    var valueAuxiliar = value.idAuxiliarContable;
                    angular.forEach($scope.punteoBanco, function(value, key) {
                        console.log(valueAuxiliar, value.idDepositoBanco);
                        conciliacionInicioRepository.insertPuntoDeposito(value.idDepositoBanco, valueAuxiliar, '', 2, 1).then(function(result) {
                            console.log(result.data);
                            if (result.data[0].length) {
                                console.log('Respuesta Incorrecta');
                            } else {
                                console.log('Respuesta Correcta');
                            }
                        })
                    });
                });
                $scope.abonoAuxiliar = 0;
                $scope.cargoAuxiliar = 0;
                $scope.abonoBanco = 0;
                $scope.cargoBanco = 0;
                $scope.getDepositosBancos(1, 1);
                $scope.getAuxiliarContable(1, '1100-0072-0001-0010', 1);
                $scope.getAuxiliarPunteo(1);
                $scope.getBancoPunteo(1);
            } else {
                alertFactory.warning('Punteo no valido')
            }
        } else {
            alertFactory.warning('No ha seleccionado ninguna relación');
        }

    };
    //****************************************************************************************************
    // INICIA Obtengo los padres del Auxiliar contable punteado
    //****************************************************************************************************
    $scope.getAuxiliarPunteo = function(idempresa) {
        conciliacionInicioRepository.getAuxiliarPunteo(idempresa).then(function(result) {
            console.log(result.data, 'Soy el auxiliar punteado con puros papas');
            $scope.auxiliarPadre = result.data;
            //$scope.tabla('auxiliarPunteado');
        });
    };
    //****************************************************************************************************
    // INICIA Obtengo los padres del Banco punteado
    //****************************************************************************************************
    $scope.getBancoPunteo = function(idempresa) {
        conciliacionInicioRepository.getBancoPunteo(idempresa).then(function(result) {
            console.log(result.data, 'Soy el banco punteado con puros papas');
            //$scope.tabla('bancoPunteado');
            $scope.bancoPadre = result.data;
        });
    };
    //****************************************************************************************************
    // INICIA inicio la tabla para los distintos casos
    //****************************************************************************************************
    $scope.tabla = function() {
        // $('.tablanose').DataTable({
        //     destroy: true,
        //     searching: false
        // });
        setTimeout(function() {
            $('.tabla-punteo').dataTable({
                destroy: true,
                "responsive": true,
                "language": {
                    "paginate": {
                        "previous": '<i class="demo-psi-arrow-left"></i>',
                        "next": '<i class="demo-psi-arrow-right"></i>'
                    }
                },
                searching: false,
                paging: false
            });
        }, 100);
    };
    $scope.eliminarPunteo = function(punteo) {
        conciliacionInicioRepository.eliminarPunteo(punteo.idPunteoAuxiliarBanco).then(function(result) {
            console.log(result.data);
            $scope.getDepositosBancos(1, 1);
            $scope.getAuxiliarContable(1, '1100-0072-0001-0010', 1);
            $scope.getAuxiliarPunteo(1);
            $scope.getBancoPunteo(1);

        });
    };

});
