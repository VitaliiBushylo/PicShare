function mainViewModel(params) {
    self = this;
    self.currentComponent = ko.observable(params.defaultComponent);
    self.switchComponentTo = function (componentName) {
        self.currentComponent(componentName);
    }
};