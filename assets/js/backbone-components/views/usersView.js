
const UsersView = Backbone.View.extend({
    el: 'main',
    render: function(){
        const rawTemplate = $('#users-list-template').html();
        const compiledTemplate = _.template(rawTemplate);
        const rendererTemplate = compiledTemplate();

        this.$el.html(rendererTemplate);

        if (this.model.length > 0 ) {
            this.model.each(function(user){
                this.$el.children('.user-list-container')
                    .children('#user-list').append(`
                        <li id="${user.get("id")}"class="list-group-item">${user.get('firstName')} ${user.get('lastName')}<button type="button" class="btn btn-success user-details" data-url="user-details">Details</button></li>
                    `);
            }, this);
        } else {
            this.$el.children('.user-list-container').prepend(`
            <div class="panel panel-default no-users-panel">
                <div class="panel-body">
                    <p class="no-users-text">There are no users registered :(</p>
                </div>
            </div>
            `)
        }


        return this;
    },

    events: {
        'click button.user-details': 'showUserDetails',
        'click button#go-back': 'onGoBack'
    },

    showUserDetails: function(e){
        this.undelegateEvents();
        const userId = parseInt($(e.target).parent().attr('id'));
        router.navigate($(e.target).attr('data-url') + `/${userId}`, { trigger: true}, {replace: true});
    },

    onGoBack: function(e){
        this.undelegateEvents();
        router.navigate($(e.target).attr('data-url'), { trigger: true}, {replace: true});
    }
});