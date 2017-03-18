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
        this.state = {
            text: props.text,
            navi: props.navi
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        page.go(this.state.navi);
    }

    render() {
        <button className="nav-btn" onClick={handleClick}>{text}</button>
    }
}



class Navigation extends React.Component {
    render() {
        <div>
            <Navibtn text="1" navi=""/>
            <Navibtn text="2" navi=""/>
            <Navibtn text="3" navi=""/>
            <Navibtn text="4" navi=""/>
        </div>
    }
}

module.exports = Navigation;