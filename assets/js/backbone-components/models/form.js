
const Form = Backbone.Model.extend({
    urlRoot: 'https://restcountries.eu/rest/v2/all',
    defaults: {
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        companyName: '',
        hobbies: ''
    },

    validate: function(attrs){
        let errorMessage;
        for (const inputField in attrs){
            if (attrs[inputField] === '') {
                errorMessage =  `Field ${inputField} can't be empty`;
            } else if (inputField === 'email') {
                const isValidEmail = this.validEmail(attrs[inputField]);
                if (!isValidEmail) {
                    errorMessage =  'Please provide a valid email address';
                }
            }
        }
        return errorMessage;
    },

    validEmail: function(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return regex.test(email);
    },
});