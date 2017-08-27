define(['knockout'], function (ko) {
    return function userModel(id, name) {
        self = this;
        self.id = id;
        self.name = name;

        self.isSelected = ko.observable(false);
    };
});