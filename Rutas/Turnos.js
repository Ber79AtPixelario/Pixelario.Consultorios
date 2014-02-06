module.exports = function(app, servicios){
    app.get('/turnos/:id', function(req, res){
        servicios.Turnos.buscarPorMedico(req.params.id, function(item){
            if (item) {
                var _turnos = [];
                item.forEach(function(subItem){
                    var _turno = {
                        id: subItem._id,
                        title: 'Consulta ' + subItem._id,
                        url: '#turno/'  + subItem._id,
                        "class": 'event-important',
                        start: subItem.inicio,
                        end: subItem.fin
                    };
                    _turnos.push(_turno);
                });
                res.send({
                    success: 1,
                    result: _turnos
                });
            } else {
                res.send(404);
            }
        });
        //res.send({
        //    "success": 1,
        //    "result": [{
        //        "id": 293,
        //        "title": "Event 1",
        //        "url": "#turno/293",
        //        "class": "event-important",
        //        "start": 1391029200000, // Milliseconds
        //        "end": 1391031000000 // Milliseconds
        //    }]
        //});
    });
    app.post('/turno', function(req, res){   
        var id = req.param('id', null);     
        var inicio = req.param('inicio', null);
        var fin = req.param('fin', null);
        var paciente = {
            _id: req.param('idPaciente', null)
        };        
        servicios.Usuarios.buscarPorId(id, function(medico){
            if(medico) {
                console.log('Encontre el medico: ' + medico.nombre.nombre);
                servicios.Turnos.registrarTurno(medico, paciente, inicio, fin);
                res.send(200);
            } else { 
                res.send(400);
            }        
        });
    });
};