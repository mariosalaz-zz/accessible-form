
const form = new Form();

const FormView = Backbone.View.extend({
    el: 'main',
    model: form,
    
    flagUrl: null,

    initialize: function(){
        this.render()
    },

    render: async function(){
        this.$el.empty();
        this.countriesList();
        const rawTemplate = $('#form-template').html();
        const compiledTemplate = _.template(rawTemplate);
        const rendererTemplate = compiledTemplate();

        this.$el.append(rendererTemplate);

        $("input:text:visible:first").focus();

        return this;
    },

    events: {
        'submit': 'onSaveData',
        'click #seeAllUsers': 'onSeeAllUsers',
        "change #countrySelect": "getCountrySelected"
    },

    onSaveData: function(e){
        e.preventDefault();
        const formData = $('form').serializeArray().reduce(function(obj, item){
            obj[item.name] = item.value;
            return obj;
        }, {});
        
        formData.flagUrl = this.flagUrl;
        this.model.set(formData);
        this.validateForm(formData);
        this.model.validate();

        if (!this.model.isValid()) {
            throw new Error(this.model.validationError);
        } else {
            const getUsersData = JSON.parse(localStorage.getItem('userData'));
            const usersList = !!getUsersData && getUsersData.length > 0 ? 
                getUsersData : [];
            const userData = this.model.toJSON();
            usersList.push(userData);
            localStorage.setItem('userData', JSON.stringify(usersList));
            this.model.clear();
            this.$el.children('form').trigger('reset');
            alert('Form saved succesfully');
        }
    },

    setErrorFormStyles: function(parentElement, inputElement, inputLabel, errorMsg){
        parentElement.addClass('has-error');
        inputLabel.addClass('has-error');
        inputElement.attr('aria-invalid', "true");
        inputElement.focus();

        if ( parentElement.find('.alert').length === 0) {
            parentElement.append(`
                <div class="alert" role="alert">
                    ${ errorMsg }
                </div>
            `);
        } else if( errorMsg && parentElement.find('.alert').length === 1){
            parentElement.children('.alert').text(errorMsg);
        }

        !inputLabel.text().includes('*') && inputLabel.text(inputLabel.text() + '*');
        
    },

    resetFormStyles: function(parentElement, inputElement ,inputLabel){
        inputElement.attr('aria-invalid', "false");
        inputLabel.hasClass('has-error') && inputLabel.removeClass('has-error');
        parentElement.hasClass('has-error') && parentElement.removeClass('has-error');

        if (parentElement.children('.alert').length > 0) {
            parentElement.children('.alert').remove();
        }

        inputLabel.text(inputLabel.text().replace('*', ''));
    },

    validateForm: function(data) {
        for (const inputField in data) {
            let errorMessage;
            const inputElement = $(`input[name=${inputField}]`).length > 0 ?
                $(`input[name=${inputField}]`) : $(`select[name=${inputField}]`).length > 0 ? 
                    $(`select[name=${inputField}]`) : $(`textarea[name=${inputField}]`);
            const parentElement = inputElement.parent();
            const inputLabel = inputElement.prev();
            if (!data[inputField]) {
                const inputFieldFormatted = inputField.replace(/([A-Z])/g, ' $1')
                    .replace(/^./, function(str){ return str.toUpperCase(); });
                errorMessage = `Field ${inputFieldFormatted} can't be empty`;
                this.setErrorFormStyles(parentElement, inputElement, inputLabel, errorMessage);
            } else if (inputField === 'email') {
                const isValidEmail = this.model.validEmail(data[inputField]);
                errorMessage = 'Please provide a valid email address';
                if (!isValidEmail) {
                    this.setErrorFormStyles(parentElement, inputElement, inputLabel, errorMessage);
                } else {
                    this.resetFormStyles(parentElement, inputElement, inputLabel);
                }
            } else {
                this.resetFormStyles(parentElement, inputElement, inputLabel);
            }
        }
    },

    onSeeAllUsers: function(e){
        this.undelegateEvents();
        router.navigate($(e.target).attr('data-url'), { trigger: true});
    },

    countriesList: function(){
        const countries = new CountriesList();
        countries.fetch({
            success: function(){
                const countriesView = new CountriesView({el: 'select#countrySelect', model: countries});
                countriesView.render();
            },
            error: function (error) {
                console.log(error);
            }
        });
    },

    getCountrySelected: function(){
        const flagUrl = $('option:selected').attr('data-img');
        this.flagUrl = flagUrl;
    }

});

