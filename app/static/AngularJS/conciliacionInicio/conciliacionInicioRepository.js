var conciliacionInicioURL = global_settings.urlCORS + 'api/login/';

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
        }
    };
});
