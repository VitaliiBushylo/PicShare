$(document).ready(() => {
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
        template: '<div class="row">' +
        '<div class="hands topHands" />' +
        '</div>' +
        '<div class="row">' +
        '<h3 class="col-md-8 col-md-offset-2 h3" data-bind="text: unregisteredUserText"></h3>' +
        '<a class="col-md-2 btn btn-info" data-bind="click: register">R E G I S T E R</a>' +
        '</div>' +
        '<br/>' +
        '<div class="row">' +
        '<h3 class="col-md-8 col-md-offset-2 h3" data-bind="text: registeredUserText"></h3>' +
        '<a class="col-md-2 btn btn-info" data-bind="click: login">L O G I N</a>' +
        '</div>'
    });

    //var mainViewModel = {
    //    currentComponent: ko.observable('welcome'),
    //    switchComponentTo: function (componentName) {
    //        currentComponent(componentName);
    //    }
    //};

    ko.applyBindings(new mainViewModel({ defaultComponent: 'welcome'}));
});

//requirejs.config({
//    //By default load any module IDs from js/lib
//    baseUrl: 'Scripts',
//    //except, if the module ID starts with "app",
//    //load it from the js/app directory. paths
//    //config is relative to the baseUrl, and
//    //never includes a ".js" extension since
//    //the paths config could be for a directory.
//    paths: {
//        vm: 'ViewModels'
//    }
//});

//requirejs(['vm/mainViewModel',
//    'vm/welcomeViewModel'],
//    function (mainViewModel, welcomeViewModel) {
//        ko.components.register('welcome', {
//            viewModel: {
//                createViewModel: function (params, componentInfo) {
//                    // - 'params' is an object whose key/value pairs are the parameters
//                    //   passed from the component binding or custom element
//                    // - 'componentInfo.element' is the element the component is being
//                    //   injected into. When createViewModel is called, the template has
//                    //   already been injected into this element, but isn't yet bound.
//                    // - 'componentInfo.templateNodes' is an array containing any DOM
//                    //   nodes that have been supplied to the component. See below.

//                    // Return the desired view model instance, e.g.:
//                    return new welcomeViewModel(params);
//                }
//            },
//            template: '<div class="row">' +
//            '<div class="hands topHands" />' +
//            '</div>' +
//            '<div class="row">' +
//            '<h3 class="col-md-8 col-md-offset-2 h3" data-bind="text: unregisteredUserText"></h3>' +
//            '<a class="col-md-2 btn btn-info" data-bind="click: register">R E G I S T E R</a>' +
//            '</div>' +
//            '<br/>' +
//            '<div class="row">' +
//            '<h3 class="col-md-8 col-md-offset-2 h3" data-bind="text: registeredUserText"></h3>' +
//            '<a class="col-md-2 btn btn-info" data-bind="click: login">L O G I N</a>' +
//            '</div>'
//        });

//        //mainViewModel.currentComponent('welcome');

//        var mainViewModel = {
//            currentComponent: ko.observable('welcome')
//        };

//        ko.applyBindings(mainViewModel);
//    });