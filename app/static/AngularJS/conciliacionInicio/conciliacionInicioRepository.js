var conciliacionInicioURL = global_settings.urlCORS + 'api/conciliacionInicio/';

registrationModule.factory('conciliacionInicioRepository', function($http) {
    return {
        getReportePdf: function(jsondata) {
            return $http({
                url: 'http://192.168.20.9:5000/api/layout/newpdf/',
                method: "POST",
                data: {
                    values: jsondata
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        insertPuntoDeposito: function(banco, auxiliar, descripcion, estatus) {
            return $http({
                url: conciliacionInicioURL + 'insertPuntoDeposito/',
                method: "POST",
                data: {
                    idDepositoBanco: banco,
                    idAuxiliarContable: auxiliar,
                    descripcion: descripcion,
                    idEstatus: estatus
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
