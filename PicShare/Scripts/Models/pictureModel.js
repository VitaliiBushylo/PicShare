define(['knockout'], function (ko) {
    return function pictureModel(id, title, url) {
        self = this;
        self.id = id;
        self.title = title;//ko.observable(title);
        self.url = url;
    };
});