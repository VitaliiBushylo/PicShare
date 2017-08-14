function boardViewModel(params) {
    var self = this;
    self.switchComponentTo = params.switchComponentTo || null;
    self.ajaxHelper = new ajaxHelper();
    self.userId = params.userId;

    self.updateBoardState = function(boardData) {
        
    };

    self.handleError = function (error) {

    };

    self.retrieveUserBoard = function () {
        self.ajaxHelper.sendAjaxRequest('GET', self.updateBoardState, self.handleError, null, 'board', self.userId);
    }();
}