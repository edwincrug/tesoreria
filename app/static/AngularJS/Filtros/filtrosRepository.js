var filtrosURL = global_settings.urlCORS + 'api/filtros/';

registrationModule.factory('filtrosRepository', function($http) {
    return {
        getEmpresas: function(idUsuario) {
            return $http({
                url: filtrosURL + 'empresas/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getSucursales: function(idUsuario, idEmpresa) {
            return $http({
                url: filtrosURL + 'sucursales/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idEmpresa: idEmpresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getDepartamentos: function(idUsuario, idSucursal) {
            return $http({
                url: filtrosURL + 'departamentos/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idSucursal: idSucursal
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getBancos: function(idBanco) {
            return $http({
                url: filtrosURL + 'bancos/',
                method: "GET",
                params: {
                    idBanco: idBanco
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getCuentaBanco: function(idCuentaBanco) {
            return $http({
                url: filtrosURL + 'cuentabanco/',
                method: "GET",
                params: {
                    idCuentaBanco: idCuentaBanco
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getClaveBanco: function(idClaveBanco) {
            return $http({
                url: filtrosURL + 'clavebanco/',
                method: "GET",
                params: {
                    idClavebanco: idClaveBanco
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getCuentacontable: function(idCuentacontable) {
            return $http({
                url: filtrosURL + 'cuentacontable/',
                method: "GET",
                params: {
                    idCuentacontable: idCuentacontable
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        AddAuxiliar: function(idEmpresa, fechaIni, fechaFin) {
            return $http({
                url: filtrosURL + 'addAuxiliarContable/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa,
                    fechaIni: fechaIni,
                    fechaFin: fechaFin
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        AddDepositos: function(idBanco, fechaInicial, fechaFinal) {
            return $http({
                url: filtrosURL + 'addDepositos/',
                method: "GET",
                params: {
                    idBanco: idBanco,
                    fechaInicial: fechaInicial,
                    fechaFinal: fechaFinal
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getAuxiliar: function(idEmpresa, numero_cuenta, idestatus) {
            return $http({
                url: filtrosURL + 'auxiliarContable/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa,
                    numero_cuenta: numero_cuenta,
                    idEstatus: idestatus
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getDepositos: function(idBanco, idestatus) {
            return $http({
                url: filtrosURL + 'depositos/',
                method: "GET",
                params: {
                    idBanco: idBanco,
                    idEstatus: idestatus
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }
    }
});
