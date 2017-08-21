require.config({
    paths: {
        vm: 'ViewModels',
        helpers: 'Helpers',

        jquery: 'jquery-1.9.1.min',
        bootstrap: 'bootstrap.min',
        jquery_md5: 'jquery.md5',
        knockout: 'knockout-3.4.2',

        welcome_startup: 'welcomeStartup',
        user_startup: 'userStartup',
        
        templates: '../views/templates'
    }

});


require(['knockout', 'welcome_startup', 'text!../views/templates/WelcomeTemplate.cshtml'], function (ko, welcomeStartup, WelcomeTemplate) {
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

    ko.components.register('welcome', {
        viewModel: { require: 'vm/welcomeViewModel' },
        template: { require: 'text!templates/WelcomeTemplate.cshtml' }
    });

    //var welcomeStartup = new welcomeStartup();
    //welcomeStartup.init();
});