$(document).ready(function() {
    ko.components.register('board', {
        viewModel: {
            createViewModel: function(params, componentInfo) {
                // - 'params' is an object whose key/value pairs are the parameters
                //   passed from the component binding or custom element
                // - 'componentInfo.element' is the element the component is being
                //   injected into. When createViewModel is called, the template has
                //   already been injected into this element, but isn't yet bound.
                // - 'componentInfo.templateNodes' is an array containing any DOM
                //   nodes that have been supplied to the component. See below.

                params.userId = $(componentInfo.element).attr('id');
                // Return the desired view model instance, e.g.:
                return new boardViewModel(params);
            }
        },
        template: '<h4 class="text-center" data-bind="text: userId"/>'
    });

    ko.applyBindings(new mainViewModel({ defaultComponent: 'board' }));
});