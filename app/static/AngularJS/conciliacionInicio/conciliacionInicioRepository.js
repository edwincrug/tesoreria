var conciliacionInicioURL = global_settings.urlCORS + 'api/conciliacionInicio/';

registrationModule.factory('conciliacionInicioRepository', function($http) {
    return {

    	getTotalAbonoCargo: function(idBanco,idEmpresa,noCuenta) {
            return $http({
                url: conciliacionURL + 'totalAbonoCargo/',
                method: "GET",
                params: {                    
                    idBanco: idBanco,                    
                    idEmpresa: idEmpresa,
                    noCuenta: noCuenta	
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }

    };
});
