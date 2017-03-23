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
            ReactDOM.render(<Modal title={title} type={type}/>, dom.getById('listMain'));
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
    }

    render() {
        let right = this.props.right;
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
                    {right > 3 && <Navibtn title="新建订单" type="/orders"/>}
                    {right > 2 && <Navibtn title="添加商品" type="/products"/>}
                    {right > 1 && <Navibtn title="添加会员" type="/members"/>}
                    {right > 0 && <Navibtn title="添加员工" type="/employees"/>}
                    </div>
                </div>
                <div id="listMain"></div>
            </div>
        );
    }
}

module.exports = Navigation;