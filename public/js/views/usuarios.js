define(['ConsultoriosView', 'views/usuario', 'text!templates/usuarios.html', 'models/UsuarioCollection'], 
    function(ConsultoriosView, UsuarioView, UsuariosTemplate, UsuarioCollection){
    var usuariosView = ConsultoriosView.extend({
        el: $('#page-wrapper'),
        initialize: function(options){
            this.collection.on('reset', this.renderCollection, this);
            this.role = options.role;
        },
        render: function(){
            this.$el.html(_.template(UsuariosTemplate, {
                model: {
                    role: this.role
                }
            }));
        },
        renderCollection: function(collection){
            $('#tablaSecretarios tbody').html('');
            if(collection) {
                collection.each(function(item){
                    var filaHtml = (new UsuarioView({
                        model: item
                    })).render().el;
                    $(filaHtml).appendTo('#tablaSecretarios tbody');
                });
            } 
        }
    });
    return usuariosView;
});