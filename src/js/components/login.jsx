let React = require('react');
let ReactDOM = require('react-dom');
const item = React.createClass({
  render: function() {
    // 账号输入框
    function Account() {
        return <div><input type="text" placeholder="请输入登录账号"/></div>;
    }

    // 密码输入框
    function Password() {
        return <div><input type="password" placeholder="请输入登录密码"/></div>;
    }

    function Loginbutton() {
        return <div><input type="button" value="登&nbsp;&nbsp;&nbsp;&nbsp;录" className="btn"/></div>;
    }

    return (
      <div className="jst-login">
        <Account/>
        <Password/>
        <Loginbutton/>
      </div>
    );
  }
});
module.exports = item;