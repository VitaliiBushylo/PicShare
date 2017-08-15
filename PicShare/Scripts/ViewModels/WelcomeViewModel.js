function welcomeViewModel(params) {
    var self = this;
    self.switchComponentTo = params.switchComponentTo || null;
    self.name = ko.observable('').extend({ required: '' });
    self.password = ko.observable('').extend({ required: '' });
    self.welcomeText = ko.observable('Please REGISTER or LOGIN');
    self.ajaxHelper = new ajaxHelper();
    self.isRgistering = ko.observable(false);
    self.isLoginin = ko.observable(false);
    self.registrationCompleted = ko.observable(false);

    self.register = function (element) {
        if (self.name.hasError() || self.password.hasError()) return;
        self.isRgistering(true);
        var data = { name: self.name(), password: self.password() };
        self.ajaxHelper.sendAjaxRequest('POST', function (response) {
            self.isRgistering(false);
            if (response.HasError) {
                alert(response.ErrorMessage);
                return;
            }

            self.password('');
            self.welcomeText(response.JsonContent + ', you successfully registered. Now please login.');
            self.registrationCompleted(true);
        },
        self.handleError, data, 'account');

    };

    self.login = function (element) {
        if (self.name.hasError() || self.password.hasError()) return;
        self.isLoginin(true);
        var data = { name: self.name(), password: $.md5(self.password()) };
        self.ajaxHelper.sendAjaxRequest('PUT', function (response) {
            self.isLoginin(false);
            if (response.HasError) {
                alert(response.ErrorMessage);
                return;
            }

            var redirectUri = window.location.origin + response.JsonContent;
            //redirect to a user page
            window.location.replace(redirectUri);
        },
        self.handleError,data, 'account');
    };

    self.handleError = function(error) {
        alert(error);
    };
};

