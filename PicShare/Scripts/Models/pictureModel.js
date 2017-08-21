define(['knockout'], function (ko) {
    return function pictureModel(id, title) {
        self = this;
        self.id = id;
        self.title = ko.obsevable(title);
    };
});