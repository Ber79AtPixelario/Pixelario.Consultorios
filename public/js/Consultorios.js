define(['router'], function(router){
    var initialize = function(){
        checkLogin(runApplication)
    };   
    var checkLogin = function(callback){
        $.ajax("/cuenta/autenticada",{
            method: "GET",
            success: function(){
                return callback(true);
            },
            error: function(data){
                return callback(false);
            }
        });
    };
    var runApplication = function(authenticated){
        if(!authenticated){
            window.location='/';
        }else{
            window.location.hash='index';
        }
        _.extend(Backbone.Validation.callbacks, {
            valid: function (view, attr, selector) {
                var $el = view.$("[name='" + attr + "']"), 
                $group = $el.closest('.form-group');        
                $group.removeClass('has-error');
                $group.find('.help-block').html('').addClass('hidden');
            },
            invalid: function (view, attr, error, selector) {
                var $el = view.$("[name='" + attr + "']"), 
                $group = $el.closest('.form-group');        
                $group.addClass('has-error');
                $group.find('.help-block').html(error).removeClass('hidden');
            }
        });
        Backbone.history.start();
    };
    return{
        initialize: initialize        
    };
});