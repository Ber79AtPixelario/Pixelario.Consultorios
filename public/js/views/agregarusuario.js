define(['ConsultoriosView', 'text!templates/agregarusuario.html', 'models/Usuario'], 
    function(ConsultoriosView, AgregarUsuarioTemplate, Usuario){
    var agregarUsuarioView = ConsultoriosView.extend({
        el: $('#page-wrapper'),
        events: {
            "submit form": "register"
        },
        initialize: function(options){
            if(options.role){
                this.role = options.role;
            } else {
                this.role = null;
            }
            Backbone.Validation.bind(this);
        },
        render: function(){            
            var thas = this;
            this.$el.html(_.template(AgregarUsuarioTemplate,{
                model: {
                    role: thas.role
                }
            }));
        },
        register: function(){
            var view = this;           
            this.model.set('email', $('input[name=email]').val(), {validate: true});
            this.model.set('cemail', $('input[name=cemail]').val(), {validate: true});
            this.model.set('password',$('input[name=password]').val(), {validate: true});
            this.model.set('cpassword',$('input[name=cpassword]').val(), {validate: true});
            this.model.set('nombre.nombre',$("input[name='nombre.nombre']").val(), {validate: true});
            this.model.set('nombre.apellido',$("input[name='nombre.apellido']").val(), {validate: true});
            var isValid = this.model.isValid(true);
            if (isValid) {
                $.post('/usuario', {
                    nombre: this.model.get('nombre.nombre'),
                    apellido: this.model.get('nombre.apellido'),
                    email: this.model.get('email'),
                    password: this.model.get('password'),
                    role: view.role
                }, function(data){
                    console.log(data);
                    window.location.hash = 'verUsuarios/' +view.role;
                });
            }            
            return false;
        }        
    });
    return agregarUsuarioView;
});