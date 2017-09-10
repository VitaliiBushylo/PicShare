define(['knockout', 'helpers/ajaxHelper'], function (ko, ajaxHelper) {
    return function pictureModel(id, title, url, userId) {
        var self = this;

        self.ajaxHelper = new ajaxHelper();
        self.id = id;
        self.title = title;
        self.url = url;
        self.userId = userId;
        self.comments = ko.observableArray([]);
        
        self.isSavingComment = ko.observable(false);
        self.newCommentText = ko.observable('');
        self.saveComment = function (element) {
            if (!self.newCommentText()) return;
            self.isSavingComment(true);
            var data = {
                Id: '',
                UserId: self.userId,
                UserName: '',
                PictureId: self.id,
                CommentText: self.newCommentText(),
                CreatedOn: ''
            };
            self.ajaxHelper.sendAjaxRequest('POST', self.savedCommentSuccessfully, self.handleError, data, 'board', '/savecomment');
        };

        self.savedCommentSuccessfully = function (savedComment) {
            self.newCommentText('');
            self.isSavingComment(false);
            if (savedComment) self.comments.push(savedComment);
        };

        self.handleError = function (error) {
            alert(error.responseText);
            self.isSavingComment(false);
        };

        self.updateComments = function (comments) {
            if (!comments) return;
            self.comments.removeAll();
            ko.utils.arrayForEach(comments, function (comment) {
                self.comments.push(comment);
            });
        };
    };
});