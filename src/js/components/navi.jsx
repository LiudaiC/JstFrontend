/*
* @Author liudch
* 
* @Description The naviagtion for jst-system. It contains 4 buttons to change 
*              the view in difference condition;
* 
*/
let re = require('../utils/ajax.js');
let page = require('../utils/page.js');
let React = require('react');
let ReactDOM = require('react-dom');

class Navibtn extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        page.go(this.props.navi);
    }

    render() {
        var text = this.props.text;
        return(<button className="nav-btn btn" onClick={this.handleClick}>{text}</button>);
    }
}



class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            navi: props.navi
        };
    }

    render() {
        return (
        <div className="nav">
            <Navibtn text="员工列表" navi=""/>
            <Navibtn text="会员列表" navi=""/>
            <Navibtn text="产品列表" navi=""/>
            <Navibtn text="订单列表" navi=""/>
        </div>
        );
    }
}

module.exports = Navigation;