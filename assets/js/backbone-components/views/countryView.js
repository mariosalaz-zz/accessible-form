
const CountryView = Backbone.View.extend({
    tagName: 'option',

    render: function() {
        this.$el.attr("data-img", this.model.get("flag"));
        this.$el.html(this.model.get("country"));

        return this;
    }
});