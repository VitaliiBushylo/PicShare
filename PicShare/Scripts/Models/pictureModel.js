﻿define([], function () {
    return function pictureModel(id, title, url, userId) {
        self = this;
        self.id = id;
        self.title = title;
        self.url = url;
        self.userId = userId;
    };
});