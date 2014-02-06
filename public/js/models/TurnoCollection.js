define(['models/Turno'], function(Turno){
     var TurnoCollection = Backbone.Collection.extend({
          model: Turno,
           initialize: function()
        {
            this.on( "destroy", this.destroyItem, this);     
            this.on( "change", this.destroyItem, this);       
        },
         destroyItem: function(){
            this.trigger("reset", this);
        }
     });
    return TurnoCollection;
});