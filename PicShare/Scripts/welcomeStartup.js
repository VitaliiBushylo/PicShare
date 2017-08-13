$(document).ready(() => {
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
        viewModel: {
            createViewModel: function (params, componentInfo) {
                // - 'params' is an object whose key/value pairs are the parameters
                //   passed from the component binding or custom element
                // - 'componentInfo.element' is the element the component is being
                //   injected into. When createViewModel is called, the template has
                //   already been injected into this element, but isn't yet bound.
                // - 'componentInfo.templateNodes' is an array containing any DOM
                //   nodes that have been supplied to the component. See below.

                // Return the desired view model instance, e.g.:
                return new welcomeViewModel(params);
            }
        },
        template:
        '<div class="row">' +
        '<h3 class="col-md-12 text-center h3" data-bind="text: welcomeText"></h3>' +
        '</div>' +
        '<div class="row">'+
        '<div class="col-md-4" />'+
        '<form class="col-md-4">'+
            '<div class="form-group">'+
                '<label for="name">Name</label>'+
                '<p data-bind="css: {error: name.hasError}">'+
                    '<input type="text" class="form-control" id="name" placeholder="name" data-bind="textInput: name, enable: !isRgistering() && !isLoginin()" required />'+
                    '<span data-bind="visible: name.hasError, text: name.validationMessage" />'+
                '</p>'+
            '</div>'+
            '<div class="form-group">'+
                '<label for="pass">Password</label>'+
                '<p data-bind="css: {error: password.hasError}">'+
                    '<input type="password" class="form-control" id="pass" placeholder="password" data-bind="textInput: password, enable: !isRgistering() && !isLoginin()" required />'+
                    '<span data-bind="visible: password.hasError, text: password.validationMessage" />'+
                '</p>'+
            '</div>'+
        '</form>'+
        '<div class="col-md-4" />'+
    '</div>'+      
        '<div class="row">'+
            '<div class="col-md-3" />'+
        '<button class="col-md-2 btn btn-info" data-bind="visible: !registrationCompleted(), click: register, enable: !isRgistering()  && !isLoginin() && !name.hasError() && !password.hasError()">' +
        '<i data-bind="visible: isRgistering" class="fa fa-spinner fa-spin"></i>'+
        '<!-- ko if: isRgistering -->'+
            ' Registering ...'+
            '<!-- /ko -->'+
        '<!-- ko ifnot: isRgistering -->'+
        'R E G I S T E R'+
            '<!-- /ko -->' +
        '</button>' +
            '<div class="col-md-2" />'+
        '<button class="col-md-2 btn btn-info" data-bind="click: login, enable: !isLoginin() && !isRgistering() && !name.hasError() && !password.hasError()">'+
        '<i data-bind="visible: isLoginin" class="fa fa-spinner fa-spin" ></i>'+
            '<!-- ko if: isLoginin -->'+
        ' Login in ...'+
            '<!-- /ko -->'+
        '<!-- ko ifnot: isLoginin -->'+
        'L O G I N'+
        '<!-- /ko -->'+
        '</button>'+
            '<div class="col-md-3" />'+
        '</div>'
    });

    ko.applyBindings(new mainViewModel({ defaultComponent: 'welcome' }));
});