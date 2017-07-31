function welcomeViewModel(params) {
    var self = this;
    self.switchComponentTo = params.switchComponentTo || null;
    self.registeredUserText = "If you already registered click ";
    self.unregisteredUserText = "To be abel to share your pictures click ";
    self.ajaxHelper = new ajaxHelper();

    self.register = function () {
        self.ajaxHelper.sendAjaxRequest('GET', function (userModel) {
            self.switchComponentTo('register');
        }, null, 'account');
    };

    self.login = function () {

    };
};

