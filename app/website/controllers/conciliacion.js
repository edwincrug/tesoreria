var ConciliacionView = require('../views/reference'),
    ConciliacionModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');

var Conciliacion = function (conf) {
    this.conf = conf || {};

    this.view = new ConciliacionView();
    this.model = new ConciliacionModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


Conciliacion.prototype.get_abonoContable = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.STRING },                  
                  { name: 'fInicial', value: req.query.fInicial, type: self.model.types.STRING },
                  { name: 'fFinal', value: req.query.fFinal, type: self.model.types.STRING },
                  { name: 'opcion', value: req.query.opcion, type: self.model.types.INT }];

    this.model.query('SEL_ABONO_CONTABLE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Conciliacion.prototype.get_cargoContable = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.STRING },                  
                  { name: 'fInicial', value: req.query.fInicial, type: self.model.types.STRING },
                  { name: 'fFinal', value: req.query.fFinal, type: self.model.types.STRING },
                  { name: 'opcion', value: req.query.opcion, type: self.model.types.INT }];

    this.model.query('SEL_CARGO_CONTABLE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Conciliacion.prototype.get_abonoBancario = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.STRING },                  
                  { name: 'fInicial', value: req.query.fInicial, type: self.model.types.STRING },
                  { name: 'fFinal', value: req.query.fFinal, type: self.model.types.STRING },
                  { name: 'opcion', value: req.query.opcion, type: self.model.types.INT }];

    this.model.query('SEL_ABONO_BANCARIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Conciliacion.prototype.get_cargoBancario = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.STRING },                  
                  { name: 'fInicial', value: req.query.fInicial, type: self.model.types.STRING },
                  { name: 'fFinal', value: req.query.fFinal, type: self.model.types.STRING },
                  { name: 'opcion', value: req.query.opcion, type: self.model.types.INT }];

    this.model.query('SEL_CARGO_BANCARIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = Conciliacion;