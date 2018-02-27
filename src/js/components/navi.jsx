/*
* @Author liudch
* 
* @Description The naviagtion for jst-system. It contains 4 buttons to change 
*              the view in difference condition, and 4 buttons to add employee、
*              member、product、order.
* 
*/
let React = require('react');
let ReactDOM = require('react-dom');
let MemberList = require('./list/memberList.jsx');
let OrderList = require('./list/orderList.jsx');
let ProductList = require('./list/productList.jsx');
let EmployeeList = require('./list/employeeList.jsx');
let re = require('../utils/ajax.js');
let dom = require('../utils/dom.js');
let Modal = require('./modal/modal.jsx');
let PageComponent = require('./pageComponent.jsx');

class Navibtn extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        var navi = this.props.navi;
        var type = this.props.type;
        if (navi) {
            this.props.onClick(navi);
        } else {
            var title = '';
            switch (type) {
                case '/employees':
                    title = '新建员工';
                    break;
                case '/members':
                    title = '新建会员';
                    break;
                case '/products':
                    title = '新建商品';
                    break;
                case '/orders':
                    title = '结账';
                    break;
                case '/export':
                    title = '导出';
                    break;
            }
            this.props.handleChange({showModal: true, type: type, title: title});
        }
    }

    render() {
        let title = this.props.title;
        return(<button className="nav-btn btn" ref="showModal" onClick={this.handleClick}>{title}</button>);
    }
}

class PersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.showList('/orders');
    }

    render() {
        let orderNum = this.props.orderNum;
        let totalAmount = this.props.totalAmount;
        let realAmount = this.props.realAmount;
        return(
            <span className="jst-personal-info">
            本月已完成<a onClick={this.handleClick}> {orderNum} </a>项服务，原价合计<span className="color-orange">￥ {totalAmount.toFixed(2)} </span>元，
            实收总金额<span className="color-orange">￥ {realAmount.toFixed(2)} </span>元
            </span>
        );
    }
}



class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            memberList: false,
            orderList: false,
            productList: true,
            empList: false,
            personalinfo: false,
            realAmount: 0,
            total: 0,
            type: '',
            typeId: 0,
            pageNum: 1,
            pageSize: 20,
            title: ''
        };
        this.changeState = this.changeState.bind(this);
        this.showList = this.showList.bind(this);
        this.logout = this.logout.bind(this);
        this.modifyPassword = this.modifyPassword.bind(this);
        this.updateOper = this.updateOper.bind(this);
        this.updatePage = this.updatePage.bind(this);
    }

    updateOper(title, type, id) {
        this.setState({showModal:true, title:title, type: type, typeId: id})
    }

    updatePage(total, pageNum, type, empId) {
        let _this = this;
        this.setState({total: total, pageNum: pageNum}, function() {
            _this.showList(type, empId);
        });
    }

    changeState(data) {
        let _this = this;
        this.setState(data, function () {
            if(_this.state.showModal && _this.state.type != '/orders' && _this.state.type != '/export') {
                _this.refs.showModal.showModal();
            }
        });
    }

    logout () {
        re.get('/logout', function () {
            location.reload();
        });
    }

    modifyPassword() {
        this.setState({showModal: true, title: '修改密码', type: 'password'});
    }

    showList(type, empId) {
        let _this = this;
        if (typeof type != 'string') {
            _this.setState({showModal: false, typeId: 0});
            return;
        }
        _this.setState({
            showModal: false,
            memberList: false,
            orderList: false,
            productList: false,
            empList: false,
            typeId: 0
        }, function () {
            if (type.indexOf('employee') > 0) {
                type = '/employees';
            }
            switch (type) {
            case '/members':
            case '/charge':
                _this.setState({memberList: true});
                break;
            case '/orders':
                _this.setState({orderList: true, empId: empId});
                break;
            case '/products':
                _this.setState({productList: true});
                break;
            case '/employees':
                _this.setState({empList: true});
                break;
            }
        });
    }

    componentWillMount() {
        let _this = this;
        re.get('/orders/personal', function (res) {
            _this.setState({personalinfo: window.jstRight > 5050, orderNum:res.orderNum, totalAmount:res.totalAmount, realAmount: res.realAmount});
        });
    }

    render() {
        let right = this.props.right;
        let showModal = this.state.showModal;
        let type = this.state.type;
        let title = this.state.title;
        let memberList = this.state.memberList;
        let orderList = this.state.orderList;
        let productList = this.state.productList;
        let empList = this.state.empList;
        let typeId = this.state.typeId;
        let personalinfo = this.state.personalinfo;
        let orderNum = this.state.orderNum;
        let totalAmount = this.state.totalAmount;
        let empId = this.state.empId;
        let realAmount = this.state.realAmount;
        let pageNum = this.state.pageNum;
        let total = this.state.total;
        return (
            <div>
                <div className="nav">
                    <div className="jst-header" id="header">
                        <a href="javascript:void(0)" className="jst-oper" onClick={this.logout}>退出账号</a>
                        <a href="javascript:void(0)" className="jst-oper" onClick={this.modifyPassword}>修改密码</a>
                    </div>
                    <div className="list-btns">
                    {right.empList && <Navibtn title="员工列表" navi="/employees" onClick={this.showList}/>}
                    {right.memberList && <Navibtn title="会员列表" navi="/members" onClick={this.showList}/>}
                    {right.productList && <Navibtn title="商品列表" navi="/products" onClick={this.showList}/>}
                    {right.orderList && <Navibtn title="账单列表" navi="/orders" onClick={this.showList} handleChange={this.changeState}/>}
                    </div>
                    <div className="add-btns">
                    <Navibtn title="快速结账" type="/orders" handleChange={this.changeState}/>
                    {right.addProduct && <Navibtn title="添加商品" type="/products" handleChange={this.changeState}/>}
                    {right.addMember && <Navibtn title="添加会员" type="/members" handleChange={this.changeState}/>}
                    {right.addEmp && <Navibtn title="添加员工" type="/employees" handleChange={this.changeState}/>}
                    {right.addEmp && <Navibtn title="导出" type="/export" handleChange={this.changeState}/>}
                    </div>
                </div>
                <div id="listMain">
                    {memberList && <MemberList updateOper={this.updateOper} showList={this.showList} page={pageNum} updatePage={this.updatePage}/>}
                    {orderList && <OrderList empId={empId} showList={this.showList} updateOper={this.updateOper}  page={pageNum} updatePage={this.updatePage}/>}
                    {productList && <ProductList updateOper={this.updateOper}  page={pageNum} updatePage={this.updatePage}/>}
                    {empList && <EmployeeList updateOper={this.updateOper} showList={this.showList}  page={pageNum} updatePage={this.updatePage}/>}
                </div>
                <div id="modalMain">
                    {showModal && <Modal title={title} ref="showModal" type={type} typeId={typeId} closeModal={this.showList}/>}
                </div>
            </div>
        );
    }
}

module.exports = Navigation;