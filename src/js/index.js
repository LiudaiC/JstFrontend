/*
*
* @Author liudch
*
* @Description This is the login-js for the jst-system.
*
*/
require('../css/index.scss');
var React = require('react');
var ReactDOM = require('react-dom');
var LoginComponent = require('./components/login.jsx');
let NaviComponent = require('./components/navi.jsx');
let dom = require('./utils/dom.js');
let re = require('./utils/ajax.js');
re.get('/index', function (res) {
    console.log(res);
    if (res && res.right) {
        let right = res.right;
        ReactDOM.render(<NaviComponent right={right}/>, dom.getById('content'));
    } else {
        console.log('hello');
        ReactDOM.render(<LoginComponent />, dom.getById('content'));
    }
});