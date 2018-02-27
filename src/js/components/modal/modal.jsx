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
let EmployeeModal = require('./employeeModal.jsx');
let MemberModal = require('./memberModal.jsx');
let ProductModal = require('./productModal.jsx');
let OrderModal = require('./orderModal.jsx');
let dom = require('../../utils/dom.js');
let InputComponent = require('../inputComponent.jsx');
let ExportModal = require('./exportModal.jsx');

class MemberInfoModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mem: {},
            chargeList: [],
            expenseList: []
        };
    }

    componentWillMount() {
        let _this = this;
        re.get('/members/info/'+this.props.typeId, function (res) {
            if (res) {
                let cList = [];
                let eList = [];
                res.chargeList.forEach(function (e, i) {
                    let date = new Date(e.chargeTime);
                    let m = date.getMonth() + 1;
                    let d = date.getDate();
                    e.cdate = date.getFullYear() + '-'
                    + (m < 10 ? '0' + m : m) + '-'+ (d < 10 ? '0' + d :d);
                    cList.push(<li key={i}><span>{e.chargeAmount.toFixed(2)}</span><span>{e.extraAmount.toFixed(2)}</span>
                        <span>{e.cdate}</span><span>{e.memDiscount.toFixed(2)}</span><span>{e.remark}</span></li>);
                });
                res.expenseList.forEach(function (e, i) {
                    eList.push(<li key={i}><span>{e.productName}</span><span>{e.realPrice.toFixed(2)}</span><span>{e.orderTime}</span><span>{e.remark}</span></li>);
                });
                _this.setState({
                    mem: res.mem,
                    chargeList: cList,
                    expenseList: eList
                });
            }
        });
    }

    render () {
        let mem = this.state.mem;
        let chargeList = this.state.chargeList;
        let expenseList = this.state.expenseList;
        return(
            <div className="modal-body">
                <div><span className="jst-info-span">{mem.name}({mem.cardNo})</span><span className="jst-info-span">{mem.phone}</span></div>
                <div className="jst-mem-info">
                    <ul className="mem-list">
                        <li className="jst-text-center"><b>充值记录</b></li>
                        <li className="info-title"><span>充值金额(元)</span><span>赠送金额(元)</span><span>充值时间</span>
                        <span>折扣</span><span>备注</span></li>
                        {chargeList.length > 0 && chargeList }
                    </ul>
                    <ul className="mem-list">
                        <li className="jst-text-center"><b>消费记录</b>({expenseList.length +'次'})</li>
                        <li className="info-title"><span>消费项目</span><span>消费金额(元)</span><span>消费时间</span>
                        <span>备注</span></li>
                    </ul>
                    <ul className="mem-list content">
                        {expenseList.length > 0 ? expenseList : <li className="jst-text-center">暂无消费记录</li> }
                    </ul>
                </div>
            </div>
        );
    }

}

class PasswordModal extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            error: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
        this.dataChange = this.dataChange.bind(this);
    }

    changeErrorMsg (msg) {
        this.setState({error: msg});
    }

    dataChange (data) {
        let _this = this;
        _this.setState(data, function () {
            _this.props.dataChange({data:_this.state});
        });
    }

    render () {
        let error = this.state.error;
        return (
            <div className="modal-body">
                <div>
                <InputComponent type="password" placeholder="请输入原密码" name="oldPassword" desc="原密码：" dataChange={this.dataChange}/>
                </div>
                <div>
                <InputComponent type="password" placeholder="请输入新密码" name="newPassword" desc="新密码：" dataChange={this.dataChange}/>
                </div>
                <div>
                <InputComponent type="password" placeholder="确认新密码" name="confirmPassword" desc="确认新密码：" dataChange={this.dataChange}/>
                </div>
                <div className="color-red">{error}</div>
            </div>
        );
    }
}

class RechargeModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            memberId: props.typeId,
            balanceAmount: 0,
            memDiscount: ''
        };
        this.dataChange = this.dataChange.bind(this);
    }

    componentDidMount() {
        let _this = this;
        re.get('/members/'+_this.state.memberId, function (res) {
            _this.setState({memDiscount: res.memDiscount, balanceAmount: res.balanceAmount.toFixed(2)});
        });
    }
    
    dataChange (data) {
        let _this = this;
        _this.setState(data, function () {
            _this.props.dataChange({data:_this.state});
        });
    }

    render () {
        let memDiscount = this.state.memDiscount;
        let balanceAmount = this.state.balanceAmount;
        return(
            <div className="modal-body">
                <div>会员余额：{balanceAmount}  --  当前折扣：{memDiscount}</div>
                <div>
                <InputComponent type="text" placeholder="请输入充值金额" name="chargeAmount" desc="充值金额：" dataChange={this.dataChange}/>
                </div>
                <div>
                <InputComponent type="text" placeholder="请输入赠送金额" name="extraAmount" desc="赠送金额：" dataChange={this.dataChange}/>
                </div>
                <div>
                {balanceAmount && <InputComponent type="text" placeholder="请输入会员折扣: 0 ~ 1.00" name="memDiscount" value={memDiscount} desc="会员折扣：" dataChange={this.dataChange}/>}
                </div>
                <div>
                <InputComponent type="text" placeholder="请输入充值备注" name="remark" desc="备注：" dataChange={this.dataChange}/>
                </div>
            </div>
        );
    }
}

class DeleteModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            empId: props.typeId
        };
    }

    render() {
        return (
            <div className="modal-body">
                <div>
                    确定删除吗？
                </div>
            </div>
        );
    }
}

class Modal extends React.Component {

    // Extends props from ancestor
    // Set base parameter for modal
    // Bind context to special function
    constructor (props) {
        super(props);
        this.selfData = {};
        this.state = {
            typeId: props.typeId,
            left: 0,
            modalClass: 'modal',
            modalBackClass: 'modal-backdrop'
        };
        this.handleClick = this.handleClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.dataChange = this.dataChange.bind(this);
    }

    // Submit data to server
    // Close modal if submit success
    // Show alter message if fail
    handleClick() {
        let _this = this;
        let st = _this.selfData;
        let type = _this.props.type;
        if (type == 'password') {
            if (!st.oldPassword) {
                _this.refs.changePassword.changeErrorMsg('请输入原密码');
            } else if (!st.newPassword) {
                _this.refs.changePassword.changeErrorMsg('请输入新密码');
            } else if (!st.confirmPassword) {
                _this.refs.changePassword.changeErrorMsg('请确认新密码');
            } else if (st.newPassword != st.confirmPassword) {
                _this.refs.changePassword.changeErrorMsg('两次密码不一致，请重新输入');
            } else {
                re.post('/passwords', st, function (res) {
                    if (res === 2) {
                        _this.refs.changePassword.changeErrorMsg('原密码不正确');
                    } else {
                        location.reload();
                    }
                });
            }
            return;
        }
        if (type == '/orders') {
            if (!st.pids.length) {
                alert('请选择所消费的服务');
                return;
            }
            if (st.realPrice <= 0) {
                alert('请输入应收金额');
                return;
            }
        }
        if (type == '/export') {
            if (!st.type) {
                alert('请选择导出内容');
            } else {
                dom.getById('exportForm').submit();
            }
            return;
        }
        if (type == '/deleteEmployee') {
            type = '/employees/' + this.state.typeId;
            st = null
        }
        re.post(type, st, function (res) {
            let msg = '';
            _this.closeModal(type);
        });
    }

    // Change the context data in the modal input
    dataChange(data) {
        this.selfData = data.data;
    }

    // Close the modal
    closeModal(type) {
        this.props.closeModal(type);
    }

    // Show the modal after initialnized
    componentDidMount() {
        let left = (window.innerWidth-600)/2;
        if (this.props.type.indexOf('memberInfo') >= 0) {
            left = (window.innerWidth-1000)/2;
        }
        this.setState({left:left});
    }

    showModal() {
        this.refs.newModal.changeId();
    }

    // Render the modal based on source data related.
    render (props) {
        let title = this.props.title;
        let type = this.props.type;
        let modalClass = this.state.modalClass + (type.indexOf('delete') >= 0 ? ' delete-modal' : (type.indexOf('memberInfo') >= 0 ? ' mem-info-modal' : ''));
        let modalBackClass = this.state.modalBackClass;
        let left = this.state.left;
        let typeId = this.state.typeId;
        return(
            <div>
                <div className={modalClass} style={{left:left}}>
                    <div className="modal-head">
                        <span className="modal-title"><b>{title}</b></span><i className="modal-close jstfont" onClick={this.closeModal}></i>
                    </div>
                    {type == 'password' && <PasswordModal ref="changePassword" dataChange={this.dataChange}/>}
                    {type == '/employees' && <EmployeeModal ref="newModal" typeId={typeId} type={type} dataChange={this.dataChange}/>}
                    {type.indexOf('delete') > 0 && <DeleteModal ref="newModal" typeId={typeId} type={type} dataChange={this.dataChange}/>}
                    {type == '/members' && <MemberModal ref="newModal" typeId={typeId} type={type} dataChange={this.dataChange}/>}
                    {type == '/products' && <ProductModal ref="newModal" typeId={typeId} type={type} dataChange={this.dataChange}/>}
                    {type == '/orders' && <OrderModal dataChange={this.dataChange}/>}
                    {type == '/charge' && <RechargeModal typeId={typeId} dataChange={this.dataChange}/>}
                    {type == '/export' && <ExportModal typeId={typeId} dataChange={this.dataChange}/>}
                    {type == 'memberInfo' && <MemberInfoModal typeId={typeId}/>}
                    <div className="modal-footer">
                        <input type="button" className="btn cancel" value="取消" onClick={this.closeModal}/>
                        {(type != 'memberInfo' && type.indexOf('delete')<0) && <input type="button" className="btn" value={type =='/export'?'导出':'保存'} onClick={this.handleClick}/>}
                        {type.indexOf('delete') > 0 && <input type="button" className="btn" value="确定" onClick={this.handleClick}/>}
                    </div>
                </div>
                <div className={modalBackClass}></div>
            </div>
        );
    };
}

module.exports = Modal;