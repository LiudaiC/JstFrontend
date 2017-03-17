/*
* @Author liudch
* 
*/
let re = require('../utils/ajax.js')
let React = require('react');
let ReactDOM = require('react-dom');

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

    handleClick(event) {
        re.get('',function (html){
            console.log(html);
        });
    }

    render(){
        return (
            <div>
                <input type="button" value="登&nbsp;&nbsp;&nbsp;&nbsp;录" onClick={this.handleClick} className="btn"/>
            </div>
        );
    }
}

class item extends React.Component {
  render() {

    return (
      <div className="jst-login">
        <LoginInput type="text" placeholder="请输入登录账号"/>
        <LoginInput type="password" placeholder="请输入登录密码"/>
        <Loginbutton/>
      </div>
    );
  }
};

module.exports = item;