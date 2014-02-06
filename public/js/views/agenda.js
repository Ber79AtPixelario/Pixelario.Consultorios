define(['ConsultoriosView', 'text!templates/agenda.html'], function(ConsultoriosView, AgendaTemplate){
    var agendaView = ConsultoriosView.extend({
        el: $('#page-wrapper'),
        events: {
            "change #medicos": "medicoSeleccionado"
        },
        initialize: function(){
            this.collection.on('reset', this.renderCollection, this);
        },
        render: function(){},
        renderCollection: function(){
           this.$el.html(_.template(AgendaTemplate, {
               model: {
                   medicos: this.collection.toJSON()
               }
            }));
            if (this.collection.length > 0) {
                this.renderAgenda(this.collection.at(0).get('_id'));           
            }
        },
        medicoSeleccionado: function(){
            this.renderAgenda($('#medicos').val());
        },
        renderAgenda: function(id){
            this.calendar = $('#calendar').calendar({
                events_source: '/turnos/'+id,
                language: 'es-ES'
            });
            $('.botonNuevo').html('<a href="#nuevoTurno/'+ id +'" class="btn btn-default">Nuevo Turno</a>');
        }
    });
    return agendaView;
});