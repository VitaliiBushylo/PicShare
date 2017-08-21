﻿require.config({
    paths: {
        vm: 'ViewModels',
        helpers: 'Helpers',
        components: 'Components',

        jquery: 'jquery-1.9.1.min',
        bootstrap: 'bootstrap.min',
        jquery_md5: 'jquery.md5',
        knockout: 'knockout-3.4.2',

        welcome_startup: 'welcomeStartup',
        user_startup: 'userStartup',

        templates: '../Templates'
    },
    shim: {
        'bootstrap': { deps: ['jquery'] }
    }
});


require(['knockout', 'bootstrap'], function (ko) {
    //do components registeration
    ko.extenders.required = function (target, overrideMessage) {
        //add some sub-observables to our observable
        target.hasError = ko.observable();
        target.validationMessage = ko.observable();

        //define a function to do validation
        function validate(newValue) {
            target.hasError(newValue ? false : true);
            target.validationMessage(newValue ? "" : overrideMessage || "This field is required");
        }

        //initial validation
        validate(target());

        //validate whenever the value changes
        target.subscribe(validate);

        //return the original observable
        return target;
    };

    ko.components.register('welcome', { require: 'components/welcome' });

    ko.applyBindings();
});