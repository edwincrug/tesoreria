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
        insertPuntoDeposito: function(banco, auxiliar, descripcion, estatus, idpadre) {
            return $http({
                url: conciliacionInicioURL + 'insertPuntoDeposito/',
                method: "POST",
                data: {
                    idDepositoBanco: banco,
                    idAuxiliarContable: auxiliar,
                    descripcion: descripcion,
                    idEstatus: estatus,
                    idPadre: idpadre
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getAuxiliarPunteo: function(idempresa) {
            return $http({
                url: conciliacionInicioURL + 'auxiliarPunteo/',
                method: "GET",
                params: {
                    idEmpresa: idempresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getBancoPunteo: function(idempresa) {
            return $http({
                url: conciliacionInicioURL + 'bancoPunteo/',
                method: "GET",
                params: {
                    idEmpresa: idempresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        eliminarPunteo: function(idPunteo) {
            return $http({
                url: conciliacionInicioURL + 'eliminarPunteo/',
                method: "POST",
                data: {
                    idPunteoAuxiliarBanco: idPunteo
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
