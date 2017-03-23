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
        let value = e.target.value;
        this.props.handleChange(value);
    }

    render () {
        let value = props.value;
        let placeholder = props.placeholder;
        let type = props.type;
        let selfClass = props.selfClass;
        return (<input placeholder={placeholder} type={type} className={selfClass} value={value} onChange={this.handleChange}/>);

    }


}