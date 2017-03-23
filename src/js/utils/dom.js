/*
*
* @Author liudch
*
*/

module.exports = {
    
    getById: function (id) {
        return document.getElementById(id);
    },

    getByClass: function (c) {
        return document.getElementsByClassName(c);
    },

    getByTag: function (t) {
        return document.getElementsByTagName(t);
    }
};