define(['knockout', 'helpers/ajaxHelper', 'models/pictureModel', 'models/userModel'],
    function (ko, ajaxHelper, pictureModel, userModel) {
        return function boardViewModel(params) {
            var self = this;

            self.ajaxHelper = new ajaxHelper();
            self.userName = params.userName;
            self.userId = params.userId;
            self.loadingId = '#' + params.loadingId;
            self.pictures = ko.observableArray([]);
            self.isUploadFormVisible = ko.observable(false);

            self.imgUploaded = function (pictureFromSrvr) {
                self.isUploadFormVisible(false);
                self.pictures.push(new pictureModel(pictureFromSrvr.Id, pictureFromSrvr.Title, pictureFromSrvr.Url, pictureFromSrvr.UserId));
            };

            self.addNewPicture = function () {
                self.isUploadFormVisible(true);
            };

            self.goToUserDetail = function () {

            };

            self.updatePictures = function (pictures) {
                ko.utils.arrayForEach(pictures, function (pictureFromSrvr) {
                    self.pictures.push(new pictureModel(pictureFromSrvr.Id, pictureFromSrvr.Title, pictureFromSrvr.Url, pictureFromSrvr.UserId));
                });

                $(self.loadingId).remove();
            };


            self.handleError = function (error) {
                alert(error.responseText);
            };

            self.retrieveUserBoard = function () {
                var id = self.userName;
                self.ajaxHelper.sendAjaxRequest('GET', self.updatePictures, self.handleError, null, 'board', self.userName);
            };

            self.shareFormVisible = ko.observable(false);
            self.pictureToShare = ko.observable();
            self.shareWith = function (pictureModel) {
                if (!self.shareFormVisible() && !$('#' + pictureModel.id).is(":visible")) {
                    self.pictureToShare(pictureModel);
                    self.shareFormVisible(!self.shareFormVisible());
                    $('#' + pictureModel.id).toggleClass('hidden');
                    return;
                }

                if (self.shareFormVisible() && $('#' + pictureModel.id).is(":visible")) {
                    self.shareFormVisible(!self.shareFormVisible());
                    $('#' + pictureModel.id).toggleClass('hidden');
                    self.pictureToShare(null);
                    self.foundUsers.removeAll();
                    self.searchingUserName(null);
                }              
            };

            self.sharedSuccessfully = function () {

            };
            self.isSharing = ko.observable(false);
            self.sendShareRequest = function () {
                self.isSharing(true);
                self.ajaxHelper.sendAjaxRequest('POST', self.sharedSuccessfully, self.handleError, );
            };

            self.updateFaundUsers = function (users) {
                self.foundUsers.removeAll();
                ko.utils.arrayForEach(users, function (userFromSrvr) {
                    self.foundUsers.push(new userModel(userFromSrvr.id, userFromSrvr.name));
                });
                self.isSearching(false);
            };

            self.isSearching = ko.observable(false);
            self.foundUsers = ko.observableArray([]);
            self.searchingUserName = ko.observable();
            self.searchUser = function (formElement) {
                if (!self.searchingUserName()) {
                    return;
                }
                self.isSearching(true);
                self.ajaxHelper.sendAjaxRequest('GET', self.updateFaundUsers, self.handleError, null, 'userapi', self.searchingUserName());
            };

            self.selectedUsers = ko.computed(function () {
                return ko.utils.arrayFilter(self.foundUsers(), function (userModel) {
                    return userModel.isSelected() === true;
                });
            }, self);
        }
    });