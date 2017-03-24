/*
*
* @Author liudch
*
* @Description  This is a modal wrapper.
*
*
*/
let React = require('react');
let ReactDOM = require('react-dom');
let re = require('../../utils/ajax.js');
let dom = require('../../utils/dom.js');
let InputComponent = require('../inputComponent.jsx');


class RightSelect extends React.Component {
    
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        var rights = {adminRight: e.target.value};
        this.props.handleChange(rights);
    }

    render () {
        const rights = [
            {right: 0, text: '员工列表'},
            {right: 1, text: '会员列表'},
            {right: 2, text: '服务列表'},
            {right: 3, text: '订单列表'},
            {right: 4, text: '新建员工'},
            {right: 5, text: '新建会员'},
            {right: 6, text: '新建服务'},
            {right: 7, text: '快速结账'}
        ];
        const options = rights.map( e => (<option value={e.right}>{e.text}</option>));
        return(
            <select onChange={this.handleChange} value="7">
                {options}
            </select>
        );
    };

}

class EmployeeModal extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            name:'',
            gender: '',
            adminRight: 0,
            age: 0,
            idNum: '',
            phone: '',
            adress: '',
            account: '',
            password: ''
        };
        this.dataChange = this.dataChange.bind(this);
    }

    dataChange (data) {
        this.setState(data);
        this.props.dataChange({data:this.state});
    }


    render() {
        return(
        <div className="modal-body">
            <div>
            <InputComponent type="text" placeholder="请输入姓名" name="name" desc="姓名：" dataChange={this.dataChange}/>
            </div>
            <div>
            <InputComponent type="text" placeholder="请输入联系方式" name="phone" desc="联系方式：" dataChange={this.dataChange}/>
            </div>
            <div>
            <InputComponent type="text" placeholder="请输入联系地址" name="address" desc="联系地址：" dataChange={this.dataChange}/>
            </div>
            <div>
            <InputComponent type="text" placeholder="请输入身份证号" name="idNum" desc="身份证号：" dataChange={this.dataChange}/>
            </div>
            <div>
            <InputComponent type="text" placeholder="输入预设账号" name="account" desc="账号：" dataChange={this.dataChange}/>
            </div>
            <div>
            <InputComponent type="text" placeholder="输入预设密码" name="password" desc="密码：" dataChange={this.dataChange}/>
            </div>
        </div>
        );
    }
}

module.exports = EmployeeModal;