function ajaxHelper() {
    this.sendAjaxRequest = function (httpMethod, callback, data, controller, param) {
        $.ajax("/api/" + controller + (param ? "/" + param : ""),
            {
                type: httpMethod,                
                success: callback,
                data: data,
                error: function (e) {
                    var message = 'Error: ' + e.statusText + '. Reason: ' + e.responseText;
                    alert(message);
                }
            });
    };
}