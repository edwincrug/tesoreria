var filtrosURL = global_settings.urlCORS + 'api/controlDepositos/';

registrationModule.factory('controlDepositosRepository', function($http) {
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
        }
    }
});
