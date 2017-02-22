var conciliacionInicioView = require('../views/reference'),
    conciliacionInicioModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var conciliacionInicio = function(conf) {
    this.conf = conf || {};

    this.view = new conciliacionInicioView();
    this.model = new conciliacionInicioModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};
conciliacionInicio.prototype.post_insertPuntoDeposito = function(req, res, next) {

    var self = this;
    console.log(req.body.idDepositoBanco, req.body.idAuxiliarContable, req.body.descripcion, req.body.idEstatus, req.body.idPadre)

    var params = [{ name: 'idDepositoBanco', value: req.body.idDepositoBanco, type: self.model.types.INT },
        { name: 'idAuxiliarContable', value: req.body.idAuxiliarContable, type: self.model.types.INT },
        { name: 'descripcion', value: req.body.descripcion, type: self.model.types.STRING },
        { name: 'idEstatus', value: req.body.idEstatus, type: self.model.types.INT },
        { name: 'idPadre', value: req.body.idPadre, type: self.model.types.INT }
    ];

    this.model.query('INS_PUNTEO_DEPOSITO_AUXILIAR_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
conciliacionInicio.prototype.get_auxiliarPunteo = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT }];

    this.model.query('SEL_PUNTEO_AUXILIAR_PADRES_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
conciliacionInicio.prototype.get_bancoPunteo = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT }];

    this.model.query('SEL_PUNTEO_DEPOSITOS_PADRES_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
conciliacionInicio.prototype.post_eliminarPunteo = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idPunteoAuxiliarBanco', value: req.body.idPunteoAuxiliarBanco, type: self.model.types.INT }
    ];

    this.model.query('DEL_PUNTEO_AUXILIAR_DEPOSITO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
conciliacionInicio.prototype.post_detallePunteo = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idPunteoAuxiliarBanco', value: req.body.idPunteoAuxiliarBanco, type: self.model.types.INT }
    ];

    this.model.query('SEL_PUNTEO_AUXILIAR_DEPOSITO_DETALLES_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = conciliacionInicio;
