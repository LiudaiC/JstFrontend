/*
* @Author liudch
* @Description The login page
*/
let re = require('../utils/ajax.js');
let page = require('../utils/page.js');
let React = require('react');
let ReactDOM = require('react-dom');
var NaviComponent = require('./navi.jsx');

// 输入框
class LoginInput extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            type: props.type,
            placeholder: props.placeholder,
            value:'',
            error:''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        var value = event.target.value;
        var error = '';
        if (!value || !value.length) {
            error = this.state.type == 'text' ? '请输入登录账号' : '请输入登录密码';
        }
        this.setState({value:value, error:error});
        this.props.inputChange(this.state.type,value);
    }

    render() {
        var value = this.state.value;
        var error = this.state.error;
        var type = this.state.type;
        var placeholder = this.state.placeholder;
        return (
          <div>
            <input type={type} placeholder={placeholder} value={value} onChange={this.handleChange} onBlur={this.handleChange}/>
            <span>{error}</span>
          </div>
        );

    }
};

// 登录按钮
class Loginbutton extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            right: props.right,
            disabled: props.disabled,
            error: props.error
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.loginClick();
    }

    render(){
        var disabled = this.state.disabled;
        var error = this.state.error;
        return (
            <div>
                <input type="button" className="btn {disabled}" value="登&nbsp;&nbsp;&nbsp;&nbsp;录" onClick={this.handleClick}/>
                <span>{error}</span>
            </div>
        );
    }
}

class item extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            account: '',
            password: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(t,e) {
        if (t == 'text') {
            this.setState({account:e});
        } else {
            this.setState({password:e});
        }
    }

    handleClick() {
        var data = {
            account: this.state.account,
            password: this.state.password
        }
        re.post('/login', {login:data}, function (res){
            if (res.success) {
                this.setState({right: res.right});
                ReactDOM.render(<NaviComponent right={right}/>, document.getElementById('content'));
            } else {
                this.setState({error: '用户名或密码错误', disabled:'disabled'})
            }
        });
    }

    render() {
        var account = this.state.account;
        var password = this.state.password;
        return (
          <div className="jst-login">
            <LoginInput type="text" value={account} inputChange={this.handleChange} placeholder="请输入登录账号"/>
            <LoginInput type="password" value={password} inputChange={this.handleChange} placeholder="请输入登录密码"/>
            <Loginbutton loginClick={this.handleClick}/>
          </div>
        );
    }
};

module.exports = item;