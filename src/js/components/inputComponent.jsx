/*
*
* @Author liudch
*
* @Description  InputComponent for some input used in the project.
*
*
*/

let React = require('react');
let ReactDOM = require('react-dom');

class InputComponent extends React.Component {

    constructor (props) {
        super(props);
    }

    // 输入框的值改变触发父级对应值改变
    handleChange (e) {
        let value = {};
        let t = e.target;
        value[t.name] = t.value;
        this.props.handleChange(value);
    }

    render () {
        console.log(this.props);
        let value = props.value || '';
        let placeholder = props.placeholder || '';
        let type = props.type || 'text';
        let selfClass = props.selfClass || '';
        console.log(123);
        return (<input placeholder={placeholder} name={name} type={type} className={selfClass} value={value} onChange={this.handleChange}/>);
    }


}