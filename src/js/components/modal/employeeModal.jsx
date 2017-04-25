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

class CheckBox extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            checked: props.checked
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        let t = e.target;
        this.setState({checked: t.checked});
        this.props.handleChange({checked: t.checked, value: t.value});
    }

    render () {
        let checked = this.state.checked;
        let right = this.props.right;
        return(<input checked={checked} type="checkbox" value={right} onChange={this.handleChange}/>);
    }


}

class RightCheckboxes extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            right: props.right || 2
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        let right = this.state.right;
        right = e.checked ? right*e.value : right/e.value;
        this.setState({right: right});
        let rights = {adminRight: right};
        this.props.handleChange(rights);
    }

    render () {
        let oRight = this.props.right;
        const rights = [
            {right: 17, text: '员工列表', checked: oRight > 0 && oRight % 17 == 0},
            {right: 13, text: '会员列表', checked: oRight > 0 && oRight % 13 == 0},
            {right: 11, text: '服务列表', checked: oRight > 0 && oRight % 11 == 0},
            {right: 7, text: '账单列表', checked: oRight > 0 && oRight % 7 == 0},
            {right: 5, text: '添加员工', checked: oRight > 0 && oRight % 5 == 0},
            {right: 3, text: '添加商品', checked: oRight > 0 && oRight % 3 == 0},
            {right: 2, text: '添加会员', checked: oRight % 2 == 0}
        ];
        let options = rights.map( e => (<span key={e.right}><CheckBox right={e.right} checked={e.checked}
            handleChange={this.handleChange}/>{e.text}</span>));
        return(
            <div>
                {options}
            </div>
        );
    };

}

class EmployeeModal extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            id: 0,
            name:'',
            gender: '',
            adminRight: 2,
            age: 0,
            idNum: '',
            phone: '',
            address: '',
            account: '',
            password: ''
        };
        this.dataChange = this.dataChange.bind(this);
        this.changeId = this.changeId.bind(this);
    }

    changeId(){
        this.setState({id:-1});
    }

    componentWillMount() {
        let _this = this;
        let prop = _this.props;
        if (prop.typeId > 0) {
            re.get(prop.type+'/'+prop.typeId, function (res) {
                _this.dataChange({
                    id: res.id,
                    name: res.name || '',
                    adminRight: res.adminRight || 2,
                    idNum: res.idNum || '',
                    phone: res.phone || '',
                    address: res.address || '',
                    account: res.account || ' ',
                    password: res.password || ' '
                });
            })
        }
    }

    dataChange (data) {
        let _this = this;

        _this.setState(data, function () {
            _this.props.dataChange({data: _this.state});
        });
    }


    render() {
        let name = this.state.name;
        let phone = this.state.phone;
        let address = this.state.address;
        let idNum = this.state.idNum;
        let account = this.state.account;
        let password = this.state.password;
        let right = this.state.adminRight;
        let id = this.state.id;
        return(
        <div className="modal-body">
            <div>
            {id != 0 && <InputComponent type="text" placeholder="请输入姓名" value={name} name="name" desc="姓名：" dataChange={this.dataChange}/>}
            </div>
            <div>
            {id != 0 && <InputComponent type="text" placeholder="请输入联系方式" value={phone} name="phone" desc="联系方式：" dataChange={this.dataChange}/>}
            </div>
            <div>
            {id != 0 && <InputComponent type="text" placeholder="请输入联系地址" value={address} name="address" desc="联系地址：" dataChange={this.dataChange}/>}
            </div>
            <div>
            {id != 0 && <InputComponent type="text" placeholder="请输入身份证号" value={idNum} name="idNum" desc="身份证号：" dataChange={this.dataChange}/>}
            </div>
            <div>
            {id != 0 && <InputComponent type="text" placeholder="输入预设账号" value={account} name="account" desc="账号：" dataChange={this.dataChange}/>}
            </div>
            <div>
            {id != 0 && <InputComponent type="text" placeholder="输入预设密码" value={password} name="password" desc="密码：" dataChange={this.dataChange}/>}
            </div>
            {id != 0 && <RightCheckboxes right={right} handleChange={this.dataChange}/>}
        </div>
        );
    }
}

module.exports = EmployeeModal;