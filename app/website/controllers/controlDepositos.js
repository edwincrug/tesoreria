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


module.exports = controlDepositos;
