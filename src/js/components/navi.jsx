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
let re = require('../utils/ajax.js');
let dom = require('../utils/dom.js');
let Modal = require('./modal/modal.jsx');

class Navibtn extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        var navi = this.props.navi;
        var type = this.props.type;
        if (navi) {
            re.get(navi);
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
            }
            this.props.handleChange({showModal: true, type: type, title: title});
        }
    }

    render() {
        let title = this.props.title;
        return(<button className="nav-btn btn" onClick={this.handleClick}>{title}</button>);
    }
}



class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            type: '',
            title: ''
        };
        this.changeState = this.changeState.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    changeState(data) {
        this.setState(data);
    }

    closeModal() {
        this.setState({showModal: false});
    }

    render() {
        let right = this.props.right;
        let showModal = this.state.showModal;
        let type = this.state.type;
        let title = this.state.title;
        return (
            <div>
                <div className="nav">
                    <div className="list-btns">
                    {right > 7 && <Navibtn title="员工列表" navi="/employees"/>}
                    {right > 6 && <Navibtn title="会员列表" navi="/members"/>}
                    {right > 5 && <Navibtn title="产品列表" navi="/products"/>}
                    {right > 4 && <Navibtn title="订单列表" navi="/orders"/>}
                    </div>
                    <div className="add-btns">
                    {right > 3 && <Navibtn title="新建订单" type="/orders" handleChange={this.changeState}/>}
                    {right > 2 && <Navibtn title="添加商品" type="/products" handleChange={this.changeState}/>}
                    {right > 1 && <Navibtn title="添加会员" type="/members" handleChange={this.changeState}/>}
                    {right > 0 && <Navibtn title="添加员工" type="/employees" handleChange={this.changeState}/>}
                    </div>
                </div>
                <div id="listMain"></div>
                <div id="modalMain">
                    {showModal && <Modal title={title} type={type} closeModal={this.closeModal}/>}
                </div>
            </div>
        );
    }
}

module.exports = Navigation;