/*
* @Author liudch
* @Description The login page
*/
let React = require('react');
let ReactDOM = require('react-dom');
let NaviComponent = require('./navi.jsx');
let re = require('../utils/ajax.js');
let dom = require('../utils/dom.js');

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
        let value = event.target.value;
        let error = '';
        if (!value || !value.length) {
            error = this.state.type == 'text' ? '请输入登录账号' : '请输入登录密码';
        }
        this.setState({value:value, error:error});
        this.props.inputChange(this.state.type,value);
    }

    render() {
        let value = this.state.value;
        let error = this.state.error;
        let type = this.state.type;
        let placeholder = this.state.placeholder;
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
        let disabled = this.state.disabled;
        let error = this.state.error;
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
        let _this = this;
        let data = {
            account: _this.state.account,
            password: _this.state.password
        }
        re.post('/login', data, function (res){
            if (res.success) {
                let right = res.right;
                _this.setState({right: right});
                ReactDOM.render(<NaviComponent right={right}/>, dom.getById('content'));
            } else {
                _this.setState({error: '用户名或密码错误', disabled:'disabled'})
            }
        });
    }

    render() {
        let account = this.state.account;
        let password = this.state.password;
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