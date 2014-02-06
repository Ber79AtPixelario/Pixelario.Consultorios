var express = require("express");
var nodemailer = require("nodemailer");
var mongoose = require("mongoose");
var MemoryStore = require("connect").session.MemoryStore;
var fs = require('fs');

var dbPath ='';

var config = {
    mail: require('./config/mail')
}

var servicios= {
    Usuarios: require('./Modelos/Usuarios')(config, mongoose, nodemailer),
    Turnos: require('./Modelos/Turnos')(config, mongoose, nodemailer)

};

var app = new express();
app.configure(function() {
    app.set('view engine', 'jade');
    app.use(express.static(__dirname + '/public'));
    app.use(express.limit('1mb'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: "Pixelario.Consultorio",
        store: new MemoryStore()
    }));
    mongoose.connect(dbPath, function(err){
        if (err) throw err;
    });
});

//Ruta index
app.get('/', function(req, res){
    res.render("index.jade", {layout: false});
});

//---------- Importar las rutas --------------------------
fs.readdirSync('Rutas').forEach(function(file){
    if(file[0] == '.') return;
    var ruta = file.substr(0, file.indexOf('.'));
    require('./Rutas/'+ ruta)(app, servicios);
});
//--------------------------------------------------------


app.get('/home', function(req, res){
    res.render("home.jade", {layout: false});
});
app.get('/cuenta/autenticada', function(req, res){
    if (req.session.loggedIn) {
        res.send(200);
    } else {
        res.send(401);
    }
});
app.post('/login', function(req, res){
    console.log('Pedido de Login');
    var email = req.param('email',null);
    var password = req.param('password',null);
    if(null == email ||email.length  < 1 
        || null == password || password.length < 1){
        res.send(400);
        return;
    }
    servicios.Usuarios.login(email ,password, function(account) {
        if(!account){
            res.send(401);
            return;
        }
        console.log('se autentico correctamente');
        req.session.loggedIn = true;
        req.session.accountId = account._id;
        res.redirect('/home');
    });    
});
app.post('/logout', function(req, res){
    console.log('Pedido de Logout');
    req.session.loggedIn = false;
    req.session.accountId = null;    
    res.send(200);
});

//******************** metodos de Turnos********************************




//******************** metodos de Usuarios******************************
//pedido deconsultas por transcurso



app.listen(8181);
console.log('Escuchando el puerto 8181.');