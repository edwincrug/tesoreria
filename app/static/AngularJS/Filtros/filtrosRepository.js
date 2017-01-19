var filtrosURL = global_settings.urlCORS + 'api/filtros/';

registrationModule.factory('filtrosRepository', function($http) {
    return {
        getEmpresas: function(idEmpresa) {
            return $http({
                url: filtrosURL + 'empresas/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa
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
        }
    }
});
