var FiltrosView = require('../views/reference'),
    FiltrosModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var Filtros = function(conf) {
    this.conf = conf || {};

    this.view = new FiltrosView();
    this.model = new FiltrosModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

Filtros.prototype.get_empresas = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }];

    this.model.query('SEL_EMPRESA_BY_USUARIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


Filtros.prototype.get_sucursales = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT }
    ];

    this.model.query('SEL_SUCURSAL_BY_USUARIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


Filtros.prototype.get_departamentos = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'idSucursal', value: req.query.idSucursal, type: self.model.types.INT }
    ];

    this.model.query('SEL_DEPARTAMENTO_BY_USUARIO_SP', params, function(error, result) {
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


Filtros.prototype.get_addAuxiliarContable = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT },
        { name: 'fechaIni', value: req.query.fechaIni, type: self.model.types.STRING },
        { name: 'fechaFin', value: req.query.fechaFin, type: self.model.types.STRING }
    ];

    this.model.query('INS_AUXILIAR_CONTABLE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Filtros.prototype.get_addDepositos = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idBanco', value: req.query.idBanco, type: self.model.types.INT },
        { name: 'fechaInicial', value: req.query.fechaInicial, type: self.model.types.STRING },
        { name: 'fechaFinal', value: req.query.fechaFinal, type: self.model.types.STRING }
    ];

    this.model.query('INS_CUENTAS_REFERENCIADAS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


Filtros.prototype.get_auxiliarContable = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT },
        { name: 'numero_cuenta', value: req.query.numero_cuenta, type: self.model.types.STRING },
        { name: 'idEstatus', value: req.query.idEstatus, type: self.model.types.INT }
    ];

    this.model.query('SEL_AUXILIAR_CONTABLE_EMPRESA_CUENTA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Filtros.prototype.get_depositos = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idBanco', value: req.query.idBanco, type: self.model.types.INT },
                    { name: 'idEstatus', value: req.query.idEstatus, type: self.model.types.INT }];

    this.model.query('SEL_DEPOSITOS_REFERENCIADOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


module.exports = Filtros;
