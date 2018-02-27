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
        var url = this.pro + '//' + this.host + '/jst' + o.url || '';
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
                var res = xhr.responseText == 'OK' ? xhr.responseText : JSON.parse(xhr.responseText);
                if (res.relogin) {
                    location.reload();
                } else {
                    let msg = '';
                    switch (res) {
                    case -1: 
                            msg = '会员卡号已存在，请重新输入！';
                            break;
                    case '[-2]':
                        msg = '会员余额不足';
                        break;
                    case -3:
                        msg = '分成比例请设置为0~10';
                    case -4:
                        msg = '账号已存在，请重新设置';
                    }
                    if (msg) {
                        alert(msg);
                        return;
                    }
                    success(res);
                }
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
            error: error,
            async: true
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