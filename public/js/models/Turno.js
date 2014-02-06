define(function(require){
    var turno = Backbone.Model.extend(
    {
        inicioEnMilisegundos: function(){
            var date = new Date(this.get('fecha').substr(6,4), this.get('fecha').substr(3,2), this.get('fecha').substr(0,2), this.get('inicio').substr(0,2), this.get('inicio').substr(3,2),'00');
            return date.getTime(); 
        },
        finEnMilisegundos: function(){
            var date = new Date(this.get('fecha').substr(6,4), this.get('fecha').substr(3,2), this.get('fecha').substr(0,2), this.get('fin').substr(0,2), this.get('fin').substr(3,2),'00');
            return date.getTime(); 
        },
        validation:
        {
            fecha: 
            {
                    required: true,
                    msg: 'Por favor ingrese dia del turno'                
            },
            inicio:
            {
                required: true,
                msg: 'Por favor ingrese la hora de inicio del turno' 
            },
            fin: {
                required: true,
                msg:'Por favor ingrese la hora de fin del turno'
            }
            
            
                
            
        }
    });
    return turno;
});