function ajaxHelper() {
    this.sendAjaxRequest = function (httpMethod, successCallback, errorCallback, data, controller, urlParam) {
        $.ajax("/api/" + controller + (urlParam ? "/" + urlParam : ""),
            {
                type: httpMethod,                
                success: successCallback,
                data: data,
                error: errorCallback
            });
    };
}