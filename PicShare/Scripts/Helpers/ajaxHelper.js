function ajaxHelper() {
    this.sendAjaxRequest = function (httpMethod, callback, data, controller, param) {
        $.ajax("/api/" + controller + (param ? "/" + param : ""),
            {
                type: httpMethod,
                success: callback,
                data: data
            });
    };
}