define(['ConsultoriosView', 'text!templates/usuario.html'],
    function(ConsultoriosView, UsuarioTemplate){
    var usuarioView = ConsultoriosView.extend({
        tagName: 'tr',
        events: {
             "click .eliminarUsuario": "eliminar",
             "click .habilitarUsuario": "habilitar"
        },
        initialize: function() {},
        render: function(){
            $(this.el).html(_.template(UsuarioTemplate, {
                model: this.model.aJSON()
            }));
            return this;
        },
        eliminar: function(){
            var item = this.model; 
            var that = this;       
            $.ajax({
                url: '/usuario',
                type: 'DELETE',
                data: {
                    id: item.get('_id')        
                },
                success: function(data){
                    item.destroy({
                        success: function() {
                           // console.log(that.parent.collection);
                        }
                    });
                },
                error: function(){
                    alert('Error');
                }
            });
        },

        habilitar: function(){
            var item = this.model; 
            var that = this;       
            $.ajax({
                url: '/usuario/' + item.get('_id') + '/habilitar', 
                type: 'POST',
                success: function(data){
                    item.set({
                        habilitado: !item.get('habilitado')
                    });
                    //.trigger('change');
                                                           
                },
                error: function(){
                    alert('Error');
                }
            });
        }
    });
    return usuarioView;
});