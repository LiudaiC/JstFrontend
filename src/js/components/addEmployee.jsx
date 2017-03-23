/*
*
* @Author liudch
*
* @Description  This is a modal used to add employee.
*
*
*/

let React = require('react');
let ReactDOM = require('react-dom');
let re = require('../utils/ajax.js');
let dom = require('../utils/dom.js');

class AddEmployee extends React.Component {

    constructor (props) {
        super(props);
    }

    render() {
        return(
            <div className="modal">
            </div>
        );
    }
}

module.exports = AddEmployee;