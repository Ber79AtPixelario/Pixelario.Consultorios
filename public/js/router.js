define(['views/index', 'views/login', 'views/menu', 'views/menutop', 'views/usuarios', 'views/agregarusuario',
    'views/editarusuario', 'views/agenda','views/nuevoturno',
    'models/Usuario','models/UsuarioCollection','models/Turno'
    ], 
    function(IndexView, LoginView, MenuView, MenuTopView, UsuariosView, AgregarUsuarioView,
        EditarUsuarioView, AgendaView,
        NuevoTurnoView, Usuario, UsuarioCollection, Turno){
    var consultorioRouter = Backbone.Router.extend({
        menuCargado: false,
        currentView: null,
        routes: {
            "index": "index",
            "login": "login",
            "verUsuarios/:role": "verUsuarios",
            "editarUsuario/:id": "editarUsuario",
            "agregarUsuario/:role": "agregarUsuario",
            "agenda": "agenda",
            "nuevoTurno/:id" : "nuevoTurno"
        },
        changeView: function(view){
            if (null != this.currentView){
                this.currentView.undelegateEvents();
            }
            this.currentView = view;
            this.currentView.render();
        },
        index: function(){   
            this.changeView(new IndexView());         
            if(!this.menuCargado){
                menuView = new MenuView();                
                menuView.render();
                menuTopView = new MenuTopView();                
                menuTopView.render();
                this.menuCargado = true;
            }
        },
        login: function(){
            this.changeView(new LoginView());
        },
        verUsuarios: function(role){
            var usuarioCollection = new UsuarioCollection();
            usuarioCollection.url = '/usuarios/'+role;
            this.changeView(new UsuariosView({
                collection: usuarioCollection,
                role: role
            }));
            usuarioCollection.fetch({
                reset: true
            });
        },
        agregarUsuario: function(role){
            this.changeView(new AgregarUsuarioView({
                role: role,
                model: new Usuario()
            }));
        },
        editarUsuario: function(id){
            var model = new Usuario({id: id});
            this.changeView(new EditarUsuarioView({
                model: model
            }));
            model.fetch({
                change: true
            });
        },
        agenda: function(){
            var usuarioCollection = new UsuarioCollection();
            usuarioCollection.url = '/usuarios/medico';
            this.changeView(new AgendaView({
                 collection: usuarioCollection
            }));
            usuarioCollection.fetch({
                reset: true
            });
        },
        nuevoTurno: function(id){
           this.changeView(new NuevoTurnoView({
                model:new Turno({
                    idMedico: id
               })
           }));  
        }
    });
    return new consultorioRouter();
});