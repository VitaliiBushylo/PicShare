define(['knockout'], function(ko) {
    var loadingVm = function() {
        this.isVisible = ko.observable(true);
    };

    ko.applyBindings(loadingVm);
});