function registerViewModel(params) {
    var self = this;
    self.name = ko.observable('');
    self.password = ko.observable('');
    self.ajaxHelper = new ajaxHelper();

    self.register = function (element) {
        if ($(element).valid()) {
            var data = { name: self.name(), password: self.password() };
            self.ajaxHelper.sendAjaxRequest('POST', function (response) {
                var resp = ko.toJSON(response);
                //redirect to a user page
                window.location.replace('take url from response');
            }, data, 'account');
        }
    };

    self.login = function (element) {
        var data = { name: self.name(), password: self.password() };
        self.ajaxHelper.sendAjaxRequest('PATCH', function (response) {
            var resp = ko.toJSON(response);
        }, data, 'account');
    };
}