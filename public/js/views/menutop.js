define(['ConsultoriosView','text!templates/menutop.html'], function(ConsultoriosView, MenuTemplate){
    var menuView = ConsultoriosView.extend({
        el: $('#navtop'),
        initializa: function(){},
        events: {
            "click .botonSalir": "salir"
        },
        render: function(){
            this.$el.html(_.template(MenuTemplate));              
        },
        salir: function(){
            $.post('/logout', function(data){
                window.location = '/';
            }).error(function(){
                alert('Hubo un error');
            });
        }
    });
    return menuView;
});