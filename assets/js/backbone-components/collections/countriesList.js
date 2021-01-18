
const CountriesList = Backbone.Collection.extend({
    model: CountryItem,
    url: 'https://restcountries.eu/rest/v2/all',
    parse: function(response){
        const parsedData = response.map(function(country){
            return {
                country: country.name,
                flag: country.flag
            }
        })
        return parsedData;
    }
});