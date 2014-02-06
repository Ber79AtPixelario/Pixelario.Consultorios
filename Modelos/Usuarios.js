module.exports = function(config, mongoose, nodemailer){
    var crypto = require('crypto');
    var TurnoSchema = new mongoose.Schema({
        inicio: { type: Number},
        fin: { type: Number},
        paciente: {
            idPaciente: { type: mongoose.Schema.ObjectId}            
        }
    });
    var UsuarioSchema = new mongoose.Schema({
        email: { type: String, unique: true},
        password: { type: String},
        nombre: {
            nombre:  { type: String},
            apellido:  { type: String},
            completo:  { type: String}
        },
        role: { type: String},
        profesion:  { type: String},
        consultorio:  { type: Number, min: 1, required: false},
        turnos: [TurnoSchema],
        horarios: [],
        obrasSociales: [],
        consulta: [],
        habilitado: {type: Boolean, default: true}
    });


    var Usuarios = mongoose.model('Usuarios', UsuarioSchema);

    var registrarUsuario = function(email, password, nombre, apellido, role){
        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);
        console.log('Registrando '+ email );
        var user = new Usuarios({
            email: email,
            nombre: {
                nombre: nombre,
                apellido: apellido,
                completo: nombre + ' ' + apellido
            },
            password: shaSum.digest('hex'),
            role: role
        });
        user.save(registerCallback);
        console.log('Se esta grabando su Usuario');        
    };
    var editarUsuario = function(id, nombre, apellido){ 
        console.log('editando '+ id );
        Usuarios.update({
            _id: id
        }, {
            $set: { 
                "nombre.nombre": nombre,
                "nombre.apellido": apellido,
                "nombre.completo": nombre + ' ' + apellido
            }
        }, {
            upsert: false
        }, function editarUsuarioCallback(err){
            if (err) {
                console.log('Error:'+ err);
            } else {
                console.log('El Usuario ' + id + ' se edito correctamente.');
            }
        });                     
    };
    var eliminarUsuario = function(id){
        console.log('Eliminar usuario: ' + id);
        Usuarios.findOne({_id: id }, function(err, doc){
            doc.remove();             
        });
    };
    var habilitarUsuario = function(id){
        console.log('Habilitar usuario: ' + id);
        Usuarios.findOne({_id: id }, function(err, doc){
            var habilitado = false;
            if (doc){
                if( null != doc.habilitado){
                    habilitado = !doc.habilitado;   
                } 
            Usuarios.update({
                _id: id
            }, {
                $set: { 
                "habilitado": habilitado
            }
        }, {
            upsert: false
        }, function(err){
            
        });   
            }
                         
        });
    };

    var login = function(email, password, callback){
        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);
        Usuarios.findOne({email: email, password: shaSum.digest('hex')}, function(err, doc){
            callback(doc);
        });
    };
    var buscarPorRole = function(role, callback){       
        console.log('Buscando usuarios por role: '+ role)
        Usuarios.find({
            'role': role,
        }, callback);
    };
    var buscarPorId = function(id, callback){       
        console.log('Buscando usuarios por id: '+ id)
        Usuarios.findOne({
            '_id': id,
        }, function(err, doc){
            callback(doc);
        });
    };

    var agregarTurno = function(usuario, inicio, fin, paciente){
        turno = {
            inicio: inicio,
            fin: fin,
            paciente: {
                idPaciente: paciente.idPaciente
            }
        };
        usuario.turnos.push(turno);
        usuario.save(function(err){
            if(err){
                console.log('Error salvando un turno: ' + err);
            }
        });
    };
    
    var registerCallback = function(err){
        if (err) {
            return console.log(err);
            }
        return console.log('La cuenta se creo satisfactoriamente');
    };

    return {
        Usuarios: Usuarios,
        registrarUsuario: registrarUsuario,
        login: login,
        buscarPorRole: buscarPorRole,
        buscarPorId: buscarPorId,
        editarUsuario: editarUsuario,
        eliminarUsuario: eliminarUsuario,
        habilitarUsuario: habilitarUsuario,
        agregarTurno: agregarTurno
    };
};