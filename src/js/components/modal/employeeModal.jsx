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
let InputComponent = require('../inputComponent.jsx');


class RightSelect extends React.Component {
    
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        var rights = {adminRight: e.target.value};
        this.props.handleChange(rights);
    }

    render () {
        const rights = [
            {right: 0, text: '员工列表'},
            {right: 1, text: '会员列表'},
            {right: 2, text: '服务列表'},
            {right: 3, text: '订单列表'},
            {right: 4, text: '新建员工'},
            {right: 5, text: '新建会员'},
            {right: 6, text: '新建服务'},
            {right: 7, text: '快速结账'}
        ];
        const options = rights.map( e => (<option value={e.right}>{e.text}</option>));
        return(
            <select onChange={this.handleChange} value="7">
                {options}
            </select>
        );
    };

}

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
            adress: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (data) {
        this.setState(data);
        this.props.dataChange(this.state);
    }


    render() {
        return(
        <div>
            <div>
            </div>
        </div>
        );
    }
}

module.exports = EmployeeModal;