/*
* @Author liudch
* 
* @Description The naviagtion for jst-system. It contains 4 buttons to change 
*              the view in difference condition, and 4 buttons to add employee、
*              member、product、order.
* 
*/
let re = require('../utils/ajax.js');
let React = require('react');
let ReactDOM = require('react-dom');

class Navibtn extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        re.get(this.props.navi);
    }

    render() {
        var text = this.props.text;
        return(<button className="nav-btn btn" onClick={this.handleClick}>{text}</button>);
    }
}



class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let right = this.props.right;
        return (
        <div className="nav">
            <div className="list-btns">
            {right > 7 && <Navibtn text="员工列表" navi="/employees"/>}
            {right > 6 && <Navibtn text="会员列表" navi="/members"/>}
            {right > 5 && <Navibtn text="产品列表" navi="/products"/>}
            {right > 4 && <Navibtn text="订单列表" navi="/orders"/>}
            </div>
            <div className="add-btns">
            {right > 3 && <Navibtn text="新建订单" navi="/orders/base"/>}
            {right > 2 && <Navibtn text="添加商品" navi="/product/base"/>}
            {right > 1 && <Navibtn text="添加会员" navi="/members/base"/>}
            {right > 0 && <Navibtn text="添加员工" navi="/employees/base"/>}
            </div>
        </div>
        );
    }
}

module.exports = Navigation;