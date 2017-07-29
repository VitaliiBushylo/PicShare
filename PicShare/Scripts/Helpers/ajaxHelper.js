function ajaxHelper() {
    this.sendAjaxRequest = function (httpMethod, callback, controller, param) {
        $.ajax("/api/" + controller + (param ? "/" + param : ""),
            {
                type: httpMethod,
                success: callback
            });
    };
}