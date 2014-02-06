define(['ConsultoriosView','text!templates/menu.html'], function(ConsultoriosView, MenuTemplate){
    var menuView = ConsultoriosView.extend({
        el: $('#navside'),
        initializa: function(){},
        render: function(){
            this.$el.html(_.template(MenuTemplate));
            $('#side-menu').metisMenu();
        }
    });
    return menuView;
});