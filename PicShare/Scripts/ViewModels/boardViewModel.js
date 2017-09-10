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
            self.boardType = {
                ownPictures: 'ownPictures',
                sharedPictures: 'sharedPictures',
                NaN: 'NaN'
            };
            self.currentBoard = ko.observable(self.boardType.NaN);

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
                    self.retrievePictureComments(pictureFromSrvr.Id);
                });

                self.toggleBoardType();
                self.toggleLoading();
            };

            self.toggleLoading = function () {
                if (self.currentBoard() === self.boardType.NaN) return;
                 $(self.loadingId).toggleClass('hidden');
            };
            self.toggleBoardType = function () {
                self.currentBoard(self.currentBoard() === self.boardType.NaN || self.currentBoard() === self.boardType.sharedPictures ? self.boardType.ownPictures : self.boardType.sharedPictures);
            };


            self.handleError = function (error) {
                alert(error.responseText);
                self.isSharing(false);
            };

            self.getPicture = function(pictureId) {
                return ko.utils.arrayFirst(self.pictures(), function (picture) {
                    return picture.id === pictureId;
                });
            };
            self.updatePictureComments = function (retrievedCommets) {
                if (!retrievedCommets) return;
                var picture = self.getPicture(retrievedCommets.pictureId);
                //if (picture) picture.updateComments(retrievedCommets.comments);

                if (!retrievedCommets.comments) return;
                picture.comments.removeAll();
                ko.utils.arrayForEach(retrievedCommets.comments, function (comment) {
                    picture.comments.push(comment);
                });
            };
            self.retrievePictureComments = function (pictureId) {
                self.ajaxHelper.sendAjaxRequest('GET', self.updatePictureComments, self.handleError, null, 'board', pictureId + '/comments');
            };

            self.retrieveUserBoard = function () {
                self.pictures.removeAll();
                self.toggleLoading();
                var data = { getSharedPictures: false };
                self.ajaxHelper.sendAjaxRequest('GET', self.updatePictures, self.handleError, data, 'board', self.userName);                
            };

            self.retreiveSharedPictures = function () {
                self.pictures.removeAll();
                self.toggleLoading();
                var data = { getSharedPictures: true };
                self.ajaxHelper.sendAjaxRequest('GET', self.updatePictures, self.handleError, data, 'board', self.userName);
                
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
                self.isSharing(false);
            };
            self.isSharing = ko.observable(false);
            self.sendShareRequest = function () {
                self.isSharing(true);
                var data = {
                    OwnerUserId: self.userId,
                    PictureId: self.pictureToShare().id,
                    PictureUrl: self.pictureToShare().url,
                    ShareToUsers: self.getSelectedUsersIds(self.selectedUsers())
                };
                self.ajaxHelper.sendAjaxRequest('POST', self.sharedSuccessfully, self.handleError, data, 'board', null);
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

            self.getSelectedUsersIds = function (selectedUsers) {
                var userIds = [];
                ko.utils.arrayForEach(selectedUsers, function (user) {
                    userIds.push(user.id);
                });
                return userIds;
            };

            self.selectedUsers = ko.computed(function () {
                return ko.utils.arrayFilter(self.foundUsers(), function (userModel) {
                    return userModel.isSelected() === true;
                });
            }, self);
        }
    });