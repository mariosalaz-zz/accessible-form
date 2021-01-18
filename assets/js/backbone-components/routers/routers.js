
const AppRouter = Backbone.Router.extend({
    routes: {
        'users-list': 'viewUsersList',
        'user-details/:id': 'viewUserDetails',
        '*other': 'viewIndex'
    },

    viewUsersList: function(){
        const usersList = JSON.parse(localStorage.getItem('userData'));
        const usersCollection = !!usersList && usersList.map(function(user, index){
            if (user.id === undefined) {
                user.id = index + 1
            }

            return new User(user);
        });

        const usersView = new UsersView({ model: new UsersList(usersCollection)});
        usersView.render();
    },

    viewUserDetails: function(userId){
        const getUser = JSON.parse(localStorage.getItem('userData'))[userId - 1];
        const userView = new UserView({model: new User(getUser)});
        userView.render();
    },

    viewIndex: function(){
        const formView = new FormView();
        formView.render();
    }

});