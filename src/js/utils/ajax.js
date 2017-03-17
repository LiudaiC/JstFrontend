/*
*
* @Author liudch
*
*/
module.exports = {
    fn: function (o) {
        var method = o.method || 'get';
        var url = o.url || '';
        var async = o.async || false;
        var data = o.data || {};
        var xhr = null;
        var success = o.success || function (){};
        var error = o.error || function (){};

        if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }

        xhr.open(method, url, async);
        xhr.send(data);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                success(xhr.responseText);
            } else {
                error();
            }
        }
    },

    get: function (url, success, error) {
        return this.fn({method:'get', url:url, success:success, error:error});
    },
    
    post: function (url, data, success, error) {
        return this.fn({method:'post', url:url, data:data, success:success, error:error});
    }
};