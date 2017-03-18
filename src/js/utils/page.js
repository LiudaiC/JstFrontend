/*
*
* @Author liudch
*
*/
module.exports = {
    protocol: location.protocol,
    host: location.host,
    go: function (url) {
        location.href = this.protocol + '//' + this.host + url;
    }
};