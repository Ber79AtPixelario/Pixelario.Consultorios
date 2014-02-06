define(['models/Usuario'], function(Usuario){
    var UsuarioCollection = Backbone.Collection.extend({
        model: Usuario,
        initialize: function()
        {
            this.on( "destroy", this.destroyItem, this);     
            this.on( "change", this.destroyItem, this);       
        },
        destroyItem: function(){
            this.trigger("reset", this);
        }
    });
    return UsuarioCollection;
});