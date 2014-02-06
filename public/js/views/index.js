define(['ConsultoriosView','text!templates/index.html'], 
    function(SocialNetView, indexTemplate){
    var indexView = SocialNetView.extend({
        el: $('#content'),
        events:{    
        },
        initialize: function(){
        },
        render: function(){
            this.$el.html(indexTemplate);
        }
    });
    return indexView;
});