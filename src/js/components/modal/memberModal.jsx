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

class MemberModal extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            name:'',
            phone: '',
            cardNo: '',
            password: '',
            chargeAmount: '',
            status: 0
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
            <InputComponent type="text" placeholder="请输入会员卡号" name="cardNo" desc="会员卡号：" dataChange={this.dataChange}/>
            </div>
            <div>
            <InputComponent type="text" placeholder="请输入密码" name="password" desc="密码：" dataChange={this.dataChange}/>
            </div>
            <div>
            <InputComponent type="text" placeholder="请输入充值金额" name="chargeAmount" desc="充值金额：" dataChange={this.dataChange}/>
            </div>
        </div>
        );
    }
}

module.exports = MemberModal;