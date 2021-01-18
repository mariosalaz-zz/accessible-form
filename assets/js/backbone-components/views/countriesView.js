
const CountriesView = Backbone.View.extend({
    render: async function(){
        this.model.each(function(country){
            const countryView = new CountryView({model: country});
            this.$el.append(countryView.render().$el);
        }, this);
    }
});