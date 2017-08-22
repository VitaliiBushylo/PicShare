﻿require.config({
    paths: {
        //aliases
        vm: 'ViewModels',
        helpers: 'Helpers',
        components: 'Components',
        models: 'Models',
        blueimp: '../Backload/Client/blueimp',

        //modules
        jquery: 'jquery-1.9.1.min',
        bootstrap: 'bootstrap.min',
        jquery_md5: 'jquery.md5',
        knockout: 'knockout-3.4.2',

        jqueryFileUpload: '../Backload/Client/blueimp/fileupload/js/jquery.fileupload',
        'jquery.ui.widget': '../Backload/Client/blueimp/fileupload/js/vendor/jquery.ui.widget',
        //jqueryFileUploaderUi: 'jQuery.FileUpload/jquery.fileupload-ui',
        //jqueryFileUploaderIframe: 'jQuery.FileUpload/jquery.iframe-transport',
        //jqueryFileUploaderAudio: 'jQuery.FileUpload/jquery.fileupload-audio',
        //jqueryFileUploaderImg: 'jQuery.FileUpload/jquery.fileupload-image',
        //jqueryFileUploaderVideo: 'jQuery.FileUpload/jquery.fileupload-video',
        //jqueryFileUploaderValidate: 'jQuery.FileUpload/jquery.fileupload-validate',

        welcome_startup: 'welcomeStartup',
        user_startup: 'userStartup',

        templates: '../Templates'
    },
    shim: {
        'bootstrap': { deps: ['jquery'] },
        'jqueryFileUpload': { deps: ['jquery.ui.widget'] }
        //'jqueryFileUploaderUi': { deps: ['jqueryFileUploaderAudio', 'jqueryFileUploaderImg', 'jqueryFileUploaderVideo', 'jqueryFileUploaderValidate'] }
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
    ko.components.register('user-board', { require: 'components/userBoard' });
    ko.components.register('file-uploader', { require: 'components/fileUploader' });

    ko.applyBindings();
});