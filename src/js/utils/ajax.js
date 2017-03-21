/*
*
* @Author liudch
*
*/
module.exports = {
    pro: location.protocol,
    hostname: location.hostname,
    host: location.host,
    fn: function (o) {
        var method = o.method || 'get';
        var url = this.pro + '//' + this.hostname + '/jst' + o.url || '';
        var async = o.async || false;
        var data = o.data || null;
        var xhr = null;
        var success = o.success || function (){console.log(111111)};
        var error = o.error || function (){};
        var contentType = o.contentType || 'application/x-www-form-urlencoded';

        if (window.ActiveXObject) {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        } else if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }

        xhr.open(method, url, async);
        xhr.setRequestHeader('Content-type', contentType);
        xhr.send(data);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var res = JSON.parse(xhr.responseText);
                success(res);
            } else {
                error();
            }
        }
    },

    get: function (url, success, error) {
        return this.fn({
            method:'get',
            url: url,
            success: success,
            error: error
        });
    },
    
    post: function (url, data, success, error) {
        data = JSON.stringify(data);
        return this.fn({
            method: 'post',
            url: url,
            contentType: 'application/json',
            data: data,
            success: success,
            error: error,
            async: true
        });
    }
};