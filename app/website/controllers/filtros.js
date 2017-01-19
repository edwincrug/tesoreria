var FiltrosView = require('../views/reference'),
    FiltrosModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var Filtros = function (conf) {
    this.conf = conf || {};

    this.view = new FiltrosView();
    this.model = new FiltrosModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

Filtros.prototype.get_empresas = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT }];

    this.model.query('SEL_EMPRESA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Filtros.prototype.get_bancos = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idBanco', value: req.query.idBanco, type: self.model.types.INT }];

    this.model.query('SEL_BANCO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Filtros.prototype.get_cuentabanco = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idCuentabanco', value: req.query.idCuentabanco, type: self.model.types.INT }];

    this.model.query('SEL_CUENTA_BANCO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Filtros.prototype.get_clavebanco = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idClavebanco', value: req.query.idClavebanco, type: self.model.types.INT }];

    this.model.query('SEL_CLAVE_BANCO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Filtros.prototype.get_cuentacontable = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idCuentacontable', value: req.query.idCuentacontable, type: self.model.types.INT }];

    this.model.query('SEL_CUENTA_CONTABLE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


module.exports = Filtros;
