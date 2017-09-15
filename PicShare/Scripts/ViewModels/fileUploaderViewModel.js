define(['jquery', 'knockout', 'helpers/ajaxHelper', 'jqueryFileUpload'], function ($, ko, ajaxHelper) {

    return function fileUploaderViewModel(params) {
        self = this;
        self.imgUploaded = params.imgUploaded;
        self.userId = params.userId;
        self.isAvatarPicture = params.isAvatarPicture;

        self.ajaxHelper = new ajaxHelper();
        self.title = ko.observable('');
        self.file = ko.observable();
        self.showFileList = ko.observable(false);
        self.progress = ko.observable(0);
        self.progressComputed = ko.computed(function () {
            return self.progress() + '%';
        }, this);

        self.init = function() {
            $(function () {
                $('#fileupload').fileupload({
                    dataType: "json",
                    url: "/api/upload/" + self.isAvatarPicture,
                    limitConcurrentUploads: 1,
                    sequentialUploads: true,
                    progressInterval: 100,
                    maxChunkSize: 10000,
                    add: function (e, data) {
                        self.file(data.files[0]);
                        self.showFileList(true);
                        self.title(self.file().name);

                        $('#btnUploadAll').click(function () {
                            data.submit();
                        });
                    },
                    done: function (e, data) {
                        var pictureData = {
                            Id: '',
                            UserId: self.userId,
                            Title: self.title(),
                            Url: data.result.imgUrl,
                            CreatedOn: ''
                        };

                        self.ajaxHelper.sendAjaxRequest('PUT',
                            self.imgUploaded,
                            function (e) { alert(e.responseText); },
                            pictureData, 'upload');
                    },
                    progressall: function (e, data) {
                        var progress = parseInt(data.loaded / data.total * 100, 10);
                        self.progress(progress);
                    },
                    progress: function (e, data) {
                        var progress = parseInt(data.loaded / data.total * 100, 10);
                        self.progress(progress);
                    }
                });
            });
        };
    };
});