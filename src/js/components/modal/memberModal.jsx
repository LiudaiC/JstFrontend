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

class TextRemarkComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.remark || ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        let t = e.target;
        this.setState({value:t.value});
        this.props.dataChange({remark:t.value});
    }

    render () {
        let value = this.state.value;
        return (
            <div><span>症状备注：</span>
            <textarea onChange={this.handleChange} rows="5" cols="24" placeholder="请输入症状备注" value={value} />
            </div>
        );
    }



}

class MemberModal extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            phone: '',
            cardNo: '',
            password: '',
            chargeAmount: 0,
            extraAmount: 0,
            status: 0,
            remark: ''
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
                    id: prop.typeId,
                    name: res.name || '',
                    phone: res.phone || '',
                    cardNo: res.cardNo || '',
                    password: res.password || '',
                    chargeAmount: res.chargeAmount || 0,
                    extraAmount: res.extraAmount || 0,
                    remark: res.remark || ''
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
        let id = this.state.id;
        let name = this.state.name;
        let phone = this.state.phone;
        let cardNo = this.state.cardNo;
        let password = this.state.password;
        let chargeAmount = this.state.chargeAmount;
        let extraAmount = this.state.extraAmount;
        let remark = this.state.remark;
        return(
        <div className="modal-body">
            <div>
            {id != 0 && <InputComponent type="text" placeholder="请输入姓名" value={name} name="name" desc="姓名：" dataChange={this.dataChange}/>}
            </div>
            <div>
            {id != 0 && <InputComponent type="text" placeholder="请输入联系方式" value={phone} name="phone" desc="联系方式：" dataChange={this.dataChange}/>}
            </div>
            <div>
            {id != 0 && <InputComponent type="text" placeholder="请输入会员卡号" value={cardNo} name="cardNo" desc="会员卡号：" dataChange={this.dataChange}/>}
            </div>
            <div>
            {id != 0 && <InputComponent type="password" placeholder="请输入密码" value={password} name="password" desc="密码：" dataChange={this.dataChange}/>}
            </div>
            <div>
            {id != 0 && <InputComponent type="text" placeholder="请输入充值金额" value={chargeAmount} name="chargeAmount" desc="充值金额：" dataChange={this.dataChange}/>}
            </div>
            <div>
            {id != 0 && <InputComponent type="text" placeholder="请输入赠送金额" value={extraAmount} name="extraAmount" desc="赠送金额：" dataChange={this.dataChange}/>}
            </div>
            {id != 0 && <TextRemarkComponent value={remark} dataChange={this.dataChange}/>}
        </div>
        );
    }
}

module.exports = MemberModal;