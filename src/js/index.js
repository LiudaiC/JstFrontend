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
let dom = require('./utils/dom.js');
ReactDOM.render(<LoginComponent />, dom.getById('content'));