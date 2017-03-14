let React = require('react');
let ReactDOM = require('react-dom');
const item = React.createClass({
  render: function() {
    return (
      <div className="jst-login">
        <div>
        <input type="text" placeholder="请输入登录账号"/>
        </div>
        <div>
        <input type="password" placeholder="请输入登录密码"/>
        </div>
      </div>
    );
  }
});
module.exports = item;