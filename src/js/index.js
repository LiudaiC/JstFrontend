/*
*
* @Author liudch
*
* @Description This is the login-js for the jst-system.
*
*/
require('../css/index.scss');
let React = require('react');
let ReactDOM = require('react-dom');
let LoginComponent = require('./components/login.jsx');
let NaviComponent = require('./components/navi.jsx');
let dom = require('./utils/dom.js');
let re = require('./utils/ajax.js');
re.get('/index', function (res) {
    if (res && res.right) {
        window.JstEmp = res.empId;
        let right = res.right;
        let rights = {
            empList: right % 17 === 0,
            memberList: right % 13 === 0,
            productList: right % 11 === 0,
            orderList: right % 7 === 0,
            addEmp: right % 5 === 0,
            addProduct: right % 3 === 0,
            addMember: right % 2 === 0
        };
        ReactDOM.render(<NaviComponent right={rights}/>, dom.getById('content'));
    } else {
        ReactDOM.render(<LoginComponent />, dom.getById('content'));
    }
});