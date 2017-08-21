define(['knockout', 'helpers/ajaxHelper', 'models/pictureModel'], function (ko, ajaxHelper, pictureModel) {
    return function boardViewModel(params) {
        var self = this;
        //self.switchComponentTo = params.switchComponentTo || null;
        self.ajaxHelper = new ajaxHelper();
        self.userName = params.userName;
        self.pictures = ko.observableArray([]);

        self.addNewPicture = function () {

        };

        self.goToUserDetail = function () {

        };

        self.updatePictures = function (pictures) {
            ko.utils.arrayForEach(pictures, function (pictureFromSrvr) {
                self.pictures.push(new pictureModel(boardData.Id, boardData.Title));
            });

            if (self.pictures().length === 0) { self.pictures.push(new pictureModel()); };
        };

        //http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
        self.updateBoardState = function (boardData) {
            if (!boardData) return;

            self.updatePictures(boardData.Pictures);
        };

        self.handleError = function (error) {
            alert(error.responseText);
        };

        self.retrieveUserBoard = function () {
            var id = self.userName;
            self.ajaxHelper.sendAjaxRequest('GET', self.updateBoardState, self.handleError, null, 'board', self.userName);
        };
    }
});