module.exports = function(config, mongoose, nodemailer){
    var TurnoSchema = new mongoose.Schema({
        inicio: { type: Number},
        fin: { type: Number},
        paciente: {
            idPaciente: { type: mongoose.Schema.ObjectId}            
        },
        medico: {
            idUsuario: { type: mongoose.Schema.ObjectId}            
        }
    });
    var Turnos = mongoose.model('Turnos', TurnoSchema);

    /* Registra un nuevo turno */
    var registrarTurno = function(medico, paciente, inicio, fin){
        var _turno = new Turnos({
            inicio: inicio,
            fin: fin,
            paciente: {
                idPaciente: paciente._id
            },
            medico:  {
                idUsuario: medico._id
            },
            habilitado: {type: Boolean, default: true}
        });
        _turno.save(function(err){
            if (err) {
                return false;
            }        
            return true;
        });        
    };
    /* Editar un turno */
    var editarTurno = function(id, inicio, fin){ 
        console.log('editando '+ id );
        Turnos.update({ _id: id }, {
            $set: { "inicio": inicio, "fin": fin }
        }, { upsert: false }, function editarUsuarioCallback(err){
            if (err) {
                console.log('Error:'+ err);
                return false;
            } else {
                return true;
            }
        });                     
    };    
    /* Elimina un turno */
    var eliminarTurno = function(id){
        console.log('Eliminar turno: ' + id);
        Turnos.findOne({_id: id }, function(err, doc){
            doc.remove();             
        });
    };
    /* Cambia el bit de habilitado de un turno */
    var habilitarTurno = function(id) {        
        Turnos.findOne({_id: id }, function(err, doc){
            var habilitado = false;
            if (doc){
                if( null != doc.habilitado){
                    habilitado = !doc.habilitado;   
                } 
                Usuarios.update({ _id: id }, {
                    $set: { "habilitado": habilitado }
                }, { upsert: false }, function(err){
                    console.log('Error al habilitar ' + id);            
                });   
            }                         
        });
    };
    /* Busca los turnos de un medico */
    var buscarPorMedico = function(id, callback){       
        console.log('Buscando turnos por medico: '+ id)
        Turnos.find( { 'medico':{ 'idUsuario': { '$oid':id } } }, callback);
    };
    /* Busca un turno por su id */
    var buscarPorId = function(id, callback){       
        console.log('Buscando turno por id: '+ id)
        Turnos.findOne({ '_id': id }, function(err, doc){
            callback(doc);
        });
    };
    return {
        Turnos: Turnos,
        registrarTurno: registrarTurno,
        editarTurno: editarTurno,
        eliminarTurno: eliminarTurno,
        habilitarTurno: habilitarTurno,        
        buscarPorMedico: buscarPorMedico,
        buscarPorId: buscarPorId        
    };
};