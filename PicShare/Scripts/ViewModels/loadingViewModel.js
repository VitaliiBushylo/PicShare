define(['knockout', 'koPostbox'], function (ko) {
    return function loadingViewModel(params) {
        self = this;
        self.hideLoading = ko.observable(false).subscribeTo('hideLoading');
        self.hideLoading.subscribe(function (newValue) {
            console.log('newValue [' + newValue + ']');
            self.isVisible(!newValue);
        });
        self.isVisible = ko.observable(true);

        //self.logger = ko.computed(function () {
        //    console.log(self.hideLoading());
        //}, this);

        //self.hideLoading = function () {
        //    self.isVisible(false);
        //};

        self.initSubscribtion = function () {
            //var postbox = new ko.subscribable();
            //postbox.subscribe(function (newValue) {
            //    console.log('[' + newValue+']');
            //}, self, "hideLoading");

            //ko.postbox.subscribe('hideLoading', function (newValue) {
                //console.log('newValue [' + newValue + ']');
                //self.isVisible(newValue);
            //});
        };
    };
});