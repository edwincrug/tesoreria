var conciliacionURL = global_settings.urlCORS + 'api/conciliacion/';

registrationModule.factory('conciliacionRepository', function($http) {
    return {
        getAbonoContable: function(idEmpresa, fInicial, fFinal) {
            return $http({
                url: conciliacionURL + 'abonoContable/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa,                    
                    fInicial: fInicial,
                    fFinal: fFinal
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getCargoContable: function(idEmpresa, fInicial, fFinal) {
            return $http({
                url: conciliacionURL + 'cargoContable/',
                method: "GET",
                params: {                    
                    idEmpresa: idEmpresa,                    
                    fInicial: fInicial,
                    fFinal: fFinal
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getCargoBancario: function(idEmpresa, fInicial, fFinal) {
            return $http({
                url: conciliacionURL + 'cargoBancario/',
                method: "GET",
                params: {                    
                    idEmpresa: idEmpresa,                    
                    fInicial: fInicial,
                    fFinal: fFinal
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getAbonoBancario: function(idEmpresa, fInicial, fFinal) {
            return $http({
                url: conciliacionURL + 'abonoBancario/',
                method: "GET",
                params: {                    
                    idEmpresa: idEmpresa,                    
                    fInicial: fInicial,
                    fFinal: fFinal
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }
    }
});
