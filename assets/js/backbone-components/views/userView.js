

const UserView = Backbone.View.extend({
    el: 'main',
    render: function(){
        this.$el.empty();
        const userAttr = _.clone(this.model.attributes);
        const rawTemplate = $('#user-details-template').html();
        const compiledTemplate = _.template(rawTemplate);
        const renderedTemplate = compiledTemplate(userAttr);

        this.$el.append(renderedTemplate);
        this.$el.html();

    },

    events: {
        'click button.back-to-list': 'backToListPage',
        'click button.back-to-main': 'backToMainScreen',
    },

    backToListPage: function(e){
        this.undelegateEvents();
        router.navigate($(e.target).attr('data-url'), { trigger: true});
    },

    backToMainScreen: function(e){
        this.undelegateEvents();
        router.navigate($(e.target).attr('data-url'), { trigger: true}, {replace: true});
    }


});