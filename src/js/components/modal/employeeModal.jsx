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

class EmployeeModal extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            name:'',
            gender: '',
            adminRight: 0,
            age: 0,
            idNum: '',
            phone: '',
            adress: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange () {
        this.props.dataChange(this.state);
    }


    render() {
        return(<div></div>);
    }
}

module.exports = EmployeeModal;