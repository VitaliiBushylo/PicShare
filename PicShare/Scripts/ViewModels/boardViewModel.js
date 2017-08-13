function boardViewModel(params) {
    var self = this;
    self.switchComponentTo = params.switchComponentTo || null;
    self.ajaxHelper = new ajaxHelper();
    self.userId = params.userId;

    self.retrieveUserBoard = function() {
        self.ajaxHelper.sendAjaxRequest('GET', self.updateBoard, null, 'board', self.userId);
    };

    self.updateBoardState = function(boardData) {
        
    };

}