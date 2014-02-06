module.exports = function(app, servicios){
    app.get('/usuario/:id', function(req, res){    
        console.log('Buscando: ' + req.params.id);
        servicios.Usuarios.buscarPorId(req.params.id, function(item){
            if(item) {
                console.log('Econtre: ' + item.nombre.nombre);
                res.send(item);
            } else { 
                res.send(404);
            }        
        });
    });
    app.post('/usuario', function(req, res){
        var nombre = req.param('nombre', '');
        var apellido = req.param('apellido', '');
        var email = req.param('email', null);
        var password = req.param('password', null);
        var role = req.param('role', null);
        if (null == email && null == password && role == null) {
            res.send(400);
            return;
        }
        servicios.Usuarios.registrarUsuario(email, password, nombre, apellido, role);
        res.send(200);
    });
    app.put('/usuario', function(req, res){
        var nombre = req.param('nombre', '');
        var apellido = req.param('apellido', '');
        var id = req.param('id', null);
        console.log('Buscando: ' + id);
        if (null == id) {
            res.send(400);
            return;
        }
        servicios.Usuarios.buscarPorId(id, function(item){
            if( item) {
                servicios.Usuarios.editarUsuario(id, nombre, apellido);
                res.send(200);
            } else {
                res.send(404);
                return;
            }
        });
    });
    app.delete('/usuario', function(req, res){
        var id = req.param('id', null);
        console.log('Buscando: ' + id);
        if (null == id) {
            res.send(400);
            return;
        }
        servicios.Usuarios.eliminarUsuario(id);
        res.send(200);
    });
    app.post('/usuario/:id/habilitar', function(req, res){    
        console.log('Buscando para habiltar: ' + req.params.id)
        servicios.Usuarios.habilitarUsuario(req.params.id);
        res.send(200);
    });
    app.get('/usuarios/:role', function(req, res){
        servicios.Usuarios.buscarPorRole(req.params.role , function(err, listado){
            console.log('Encontrado: ' + listado.lenght);
            if(err) {
                res.send(401);
            } else if(listado.lenght == 0) {
                res.send(404);
            } else {
                res.send(listado);
            }    
        });
    });
};