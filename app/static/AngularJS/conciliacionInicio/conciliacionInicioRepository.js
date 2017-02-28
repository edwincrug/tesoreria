var conciliacionInicioURL = global_settings.urlCORS + 'api/conciliacionInicio/';

registrationModule.factory('conciliacionInicioRepository', function($http) {
    return {

    	getTotalAbonoCargo: function(idBanco,idEmpresa,noCuenta,cuentaContable) {
            return $http({
                url: conciliacionInicioURL + 'totalAbonoCargo/',
                method: "GET",
                params: {                    
                    idBanco: idBanco,                    
                    idEmpresa: idEmpresa,
                    noCuenta: noCuenta,	
                    cuentaContable: cuentaContable
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }

    };
});
