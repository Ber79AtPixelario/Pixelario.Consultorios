require.config({
    paths: {
        jQuery: '/js/libs/jquery',        
        Underscore: '/js/libs/underscore',
        Backbone: '/js/libs/backbone',
        BackboneValidation: '/js/libs/backbone-validation',
        text:'/js/libs/text',
        templates:'/js/templates',
        Bootstrap: '/js/libs/bootstrap',
        BootstrapCalendar: '/js/libs/calendar',
        BootstrapCalendarEs: '/js/libs/language/es-ES',
        metisMenu: '/js/libs/jquery.metisMenu',

    },
    shim: {
        'metisMenu': ['jQuery'],
        'Bootstrap':['metisMenu'],
        'BootstrapCalendar': ['Bootstrap'],
        'BootstrapCalendarEs': ['BootstrapCalendar'],
        'Backbone': ['Underscore', 'Bootstrap', 'BootstrapCalendarEs'],
        'BackboneValidation':['Backbone'],
        'Consultorios': ['BackboneValidation']
    }
});
require(['Consultorios'], function(Consultorios){
    Consultorios.initialize();    
});