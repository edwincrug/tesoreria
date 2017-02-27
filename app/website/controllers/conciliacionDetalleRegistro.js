var conciliacionDetalleRegistroView = require('../views/reference'),
    conciliacionDetalleRegistroModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');
var http = require('http');
var fs = require('fs');
var JSZip = require("jszip");
var zip = new JSZip();


var conciliacionDetalleRegistro = function(conf) {
    this.conf = conf || {};

    this.view = new conciliacionDetalleRegistroView();
    this.model = new conciliacionDetalleRegistroModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};
conciliacionDetalleRegistro.prototype.post_insertPuntoDeposito = function(req, res, next) {

    var self = this;


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
conciliacionDetalleRegistro.prototype.get_auxiliarPunteo = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT }];

    this.model.query('SEL_PUNTEO_AUXILIAR_PADRES_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
conciliacionDetalleRegistro.prototype.get_bancoPunteo = function(req, res, next) {

    var self = this;


    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT }];

    this.model.query('SEL_PUNTEO_DEPOSITOS_PADRES_SP', params, function(error, result) {


        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
conciliacionDetalleRegistro.prototype.post_eliminarPunteo = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idPunteoAuxiliarBanco', value: req.body.idPunteoAuxiliarBanco, type: self.model.types.INT }];

    this.model.query('DEL_PUNTEO_AUXILIAR_DEPOSITO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
conciliacionDetalleRegistro.prototype.post_detallePunteo = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idPunteoAuxiliarBanco', value: req.body.idPunteoAuxiliarBanco, type: self.model.types.INT }];

    this.model.query('SEL_PUNTEO_AUXILIAR_DEPOSITO_DETALLES_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
conciliacionDetalleRegistro.prototype.post_reportePdf = function(req, res, next) {
    var filename = guid();
    var filePath = path.dirname(require.main.filename) + "\\pdf\\" + filename + ".pdf";
    var options = {
        "method": "POST",
        "hostname": "189.204.141.193",
        "port": "5488",
        "path": "/api/report",
        "headers": {
            "content-type": "application/json"
        }
    };
    var request = http.request(options, function(response) {
        var chunks = [];

        response.on("data", function(chunk) {
            chunks.push(chunk);
        });

        response.on("end", function() {
            var body = Buffer.concat(chunks);

            fs.writeFile(filePath, body, function(err) {
                if (err) return console.log(err);
            });

        });
    });
    request.write(JSON.stringify(req.body.values));
    request.end();
    var self = this;
    self.view.expositor(res, {
        error: null,
        result: filename
    });
};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '_' + s4() + '_' + s4() + '_' +
        s4() + '_' + s4() + s4() + s4();
};
conciliacionDetalleRegistro.prototype.get_viewpdf = function(req, res, next) {

    var filename = req.query.fileName;
    var filePath = path.dirname(require.main.filename) + "\\pdf\\" + filename + ".pdf";

    fs.readFile(filePath, function(err, file) {
        res.writeHead(200, { "Content-Type": "application/pdf" });
        res.write(file, "binary");
        res.end();
        fs.unlinkSync(filePath);
    });
};
conciliacionDetalleRegistro.prototype.post_sendMail = function(req, res, next) {

    //req.body.nombreArchivo
    console.log(req.body.nombreArchivo, 'Soy el nombre del archivo') //Objeto que almacena la respuesta
    var  nombreArchivo = req.body.nombreArchivo;
    var object = {};   //Objeto que envía los parámetros
    var params = [];   //Referencia a la clase para callback
    var self = this;
    var files = [];
    var ruta = "./pdf/";
    var extension = '.pdf';
    var carpeta = 'pdf'; 
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');
    var transporter = nodemailer.createTransport(smtpTransport({
        host: '192.168.20.1',
        port: 25,
        secure: false,
        auth: {
            user: 'sistemas',
            pass: 's1st3m4s'
        },
        tls: { rejectUnauthorized: false }
    }));
    var mailOptions = {
        from: '<grupoandrade.reportes@grupoandrade.com.mx>', // sender address 
        to: 'lgordillo@bism.com.mx', // list of receivers 
        subject: 'Recibos Timbrados GA', // Subject line 
        text: 'Se envían adjuntos los archivos timbrados ', // plaintext body 
        html: '<b>Se envían adjuntos los archivos timbrados </b>' // html body 
            // attachments: [{ // file on disk as an attachment
            //     filename: req.body.nombreArchivo + '.pdf',
            //     path: "./pdf/" + req.body.nombreArchivo + ".pdf" // stream this file
            // }]
    };
    console.log(mailOptions, 'Es el json mailOptions')
    transporter.sendMail(mailOptions, function(error, info) {

        if (error) {
            res.send(500);
            console.log(error, 'Soy el ERROR');
        } else {
            res.send(200);
            console.log('Message sent: ' + info.response);
            console.log(nombreArchivo,'Soy el nombre del archivo')
            fs.stat('C:\\Tesoreria\\tesoreria\\pdf\\' + nombreArchivo+ '.pdf', function(err, stats) {
                console.log(stats, 'stats')
                if (err) {
                    return console.error(err, 'Soy el segundo ERROR');
                }


            });
        }


    });

    transporter.close;
    object.error = null;            
    object.result = 1; 
    console.log(object.result)
    req.body = []; 
}

module.exports = conciliacionDetalleRegistro;
