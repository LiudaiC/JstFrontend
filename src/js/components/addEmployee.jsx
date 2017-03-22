/*
*
* @Author liudch
*
* @Description  This is a modal used to add employee.
*
*
*/

let re = require('../utils/ajax.js');
let React = require('react');
let ReactDOM = require('react-dom');

class AddEmployee extends React.Component {

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
    }

    render() {
        return(
            <div className="modal">
            </div>
        );
    }
}

module.exports = AddEmployee;