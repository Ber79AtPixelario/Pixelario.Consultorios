define(['ConsultoriosView', 'text!templates/nuevoturno.html'],
     function(ConsultoriosView, NuevoTurnoTemplate){
    var nuevoturnoView = ConsultoriosView.extend({
        el: $('#page-wrapper'),
        events: {
            "submit form": "register"
        },
        initialize: function(){
            Backbone.Validation.bind(this);
        },

        render: function(){            
            var thas = this;
            this.$el.html(NuevoTurnoTemplate);
        },
           register: function(){
            var view = this;           
            this.model.set('fecha', $('input[name=fecha]').val(), {validate: true});
            this.model.set('inicio', $('input[name=inicio]').val(), {validate: true});
            this.model.set('fin',$('input[name=fin]').val(), {validate: true});
            var isValid = this.model.isValid(true);
            if (isValid) {
                $.post('/turno', {
                    id: this.model.get('idMedico'),
                    inicio: this.model.inicioEnMilisegundos(),
                    fin: this.model.finEnMilisegundos(),
                    idPaciente: $('input[name=paciente]').val()
                }, function(data){
                    console.log(data);
                    window.location.hash = 'verTurnos/' + view.model.get('idMedico');
                });
            }            
            return false;
        }        

    });
    return nuevoturnoView;
});
