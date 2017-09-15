define(['knockout'], function (ko) {
    return function userDetailsViewModel(params) {
        var self = this;

        self.loadingId = '#' + params.loadingId;
        self.userName = params.userName;
        self.userId = params.userId;
        self.isUserPageOwner = ko.observable(params.isUserPageOwner === 'True');
        self.avatarUrl = ko.observable(window.location.origin + '/content/Boards/' + self.userName + '/avatar.jpg'); //window.location.origin + '/content/Boards/' + self.userName + '/avatar.jpg'
        self.isUploadFormVisible = ko.observable(false);

        self.toggleUploadForm = function () {
            self.isUploadFormVisible(!self.isUploadFormVisible());
        };

        self.toggleLoading = function () {
            $(self.loadingId).toggleClass('hidden');
        };

        self.imgUploaded = function (pictureFromSrvr) {
            self.isUploadFormVisible(false);
            self.avatarUrl(pictureFromSrvr.Url);
        };
    };
});