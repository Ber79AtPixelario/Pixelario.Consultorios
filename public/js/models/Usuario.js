define(function(require){
    var Usuario = Backbone.Model.extend({
        initialize: function(options){
            if (options && options.id) {
                this.id = options.id;
                this.url= '/usuario/'+ this.id;
            }
        },
        tituloHabilitado:  function(){
            var _tituloHabilitado = "Habilitado";
            if (this.get('habilitado')){
                _tituloHabilitado = "Habilitado";
            } else {
                _tituloHabilitado = "Deshabilitado";
            }
            return _tituloHabilitado;
        },
        aJSON: function(){
           var j = this.toJSON();
           j.tituloHabilitado = this.tituloHabilitado();
           return j;
        },
        validation:{
            email: {
                    required: true,
                    pattern: 'email',
                    msg: 'Por favor ingrese su correo electrónico'                
            },
            cemail: {
                required: true,
                equalTo: 'email',
                msg:'La confirmación de su correo electrónico'
            },
            password:{
                required: true,
                minLength: 6,
                msg: 'Por favor ingrese su contraseña' 
            },
            cpassword: {
                required: true,
                equalTo: 'password',
                msg:'La confirmación de la contraseña'
            },
            
                'nombre.nombre': {
                    required: true,
                    msg:'Por favor ingrese el nombre'
                },
                'nombre.apellido':{
                    required: true,
                    msg:'Por favor ingrese el apellido'
                }
            
        }
    });
    return Usuario;
});