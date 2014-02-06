define(['ConsultoriosView', 'text!templates/editarusuario.html', 'models/Usuario'], 
    function(ConsultoriosView, EditarUsuarioTemplate, Usuario){
    var editarUsuarioView = ConsultoriosView.extend({
        el: $('#page-wrapper'),
        events: {
            "submit form": "editar"
        },
        initialize: function(){
             this.model.bind('change', this.renderModel, this);            
        },
        render: function(){
        },
        renderModel: function(model){
            this.$el.html(_.template(EditarUsuarioTemplate, model.toJSON()));
        },
        editar: function(){
            var item = this.model;
            $.ajax('/usuario', {
                method: "PUT",
                data:{
                    id: item.id,
                    nombre: $('input[name=nombre]').val(),
                    apellido: $('input[name=apellido]').val()
                }, 
                success: function(data){
                    console.log(data);
                    window.location.hash = 'verUsuarios/' + item.get("role");
                },
                error: function(){
                    alert('Error');
                }
            });
            return false;
        }
    });
    return editarUsuarioView;
});