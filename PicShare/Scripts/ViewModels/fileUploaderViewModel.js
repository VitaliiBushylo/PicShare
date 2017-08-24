define(['jquery', 'knockout', 'helpers/ajaxHelper', 'jqueryFileUpload'], function ($, ko, ajaxHelper) {

    return function fileUploaderViewModel(params) {
        self = this;
        self.imgUploaded = params.imgUploaded;
        self.userId = params.userId;

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
                    url: "/api/upload",
                    limitConcurrentUploads: 1,
                    sequentialUploads: true,
                    progressInterval: 100,
                    maxChunkSize: 10000,
                    add: function (e, data) {
                        self.file(data.files[0]);
                        self.showFileList(true);
                        self.title(self.file().name);

                        //$('#filelistholder').removeClass('hide');
                        //data.context = $('<div />').text(data.files[0].name).appendTo('#filelistholder');
                        //data.context = $('<div />').text(data.files[0].name).appendTo('#filelistholder');
                        //$('</div><div class="progress"><div class="bar" style="width:0%"></div></div>').appendTo(data.context);
                        $('#btnUploadAll').click(function () {
                            data.submit();
                        });
                    },
                    done: function (e, data) {
                        //data.context.text(data.files[0].name + '... Completed');
                        //$('</div><div class="progress"><div class="bar" style="width:100%"></div></div>').appendTo(data.context);
                        //self.imgUploaded(data.result.imgUrl);

                        var data = {
                            Id: '',
                            UserId: self.userId,
                            Title: self.title(),
                            Url: data.result.imgUrl,
                            CreatedOn: ''
                        };

                        self.ajaxHelper.sendAjaxRequest('PUT',
                            self.imgUploaded,
                            function (e) { alert(e.responseText); },
                            data, 'upload');
                    },
                    progressall: function (e, data) {
                        var progress = parseInt(data.loaded / data.total * 100, 10);
                        self.progress(progress);
                        //$('#overallbar').css('width', progress + '%');
                    },
                    progress: function (e, data) {
                        var progress = parseInt(data.loaded / data.total * 100, 10);
                        self.progress(progress);
                        //data.context.find('.bar').css('width', progress + '%');
                    }
                });
            });
        };
    };
});