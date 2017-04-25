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
let dom = require('../utils/dom.js');
let re = require('../utils/ajax.js');

class InputComponent extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            value: typeof props.value == 'boolean' ? '' : props.value
        };
        this.handleChange = this.handleChange.bind(this);
    }

    changeValue (v) {
        this.setState({value:v});
    }

    handleChange (e) {
        let value = {};
        let t = e.target;
        value[t.name] = t.value;
        this.setState({value: t.value});
        if (this.props.name == 'str') {
            this.setState({balance: -1});
        }
        this.props.dataChange(value);
    }

    render () {
        let props = this.props;
        let desc = props.desc || '';
        let placeholder = props.placeholder || '';
        let name = props.name || '';
        let type = props.type || 'text';
        let selfClass = props.selfClass || '';
        let value = this.state.value;
        return (
            <label><span>{desc}</span>
            <input placeholder={placeholder} name={name} type={type}
            className={selfClass} value={value} onChange={this.handleChange} autoComplete="off"/>
            </label>
        );
    }


}

module.exports = InputComponent;