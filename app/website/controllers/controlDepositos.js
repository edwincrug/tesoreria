var controlDepositosView = require('../views/reference'),
    controlDepositosModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var controlDepositos = function(conf) {
    this.conf = conf || {};

    this.view = new controlDepositosView();
    this.model = new controlDepositosModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


controlDepositos.prototype.get_depositos = function(req, res, next) {

    var self = this;

    var params = [{ name: 'User', value: req.query.usuario, type: self.model.types.STRING },
                  { name: 'pass', value: req.query.contrasena, type: self.model.types.STRING }];

    this.model.query('SEL_LAYOUT_TXT_BANCO_PAGO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


controlDepositos.prototype.get_auxiliar = function(req, res, next) {

    var self = this;

    var params = [{ name: 'User', value: req.query.usuario, type: self.model.types.STRING },
                  { name: 'pass', value: req.query.contrasena, type: self.model.types.STRING }];

    this.model.query('SEL_LAYOUT_TXT_BANCO_PAGO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = controlDepositos;
