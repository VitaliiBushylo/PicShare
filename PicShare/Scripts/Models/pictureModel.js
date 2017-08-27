define([], function () {
    return function pictureModel(id, title, url, userId) {
        self = this;
        self.id = id;
        self.title = title;//ko.observable(title);
        self.url = url;
        self.userId = userId;
    };
});