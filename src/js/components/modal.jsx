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

class modal extends React.Component () {

    constructor (props) {
        super(props);
    }

    render (props) {
        var title = this.props.title;
        var content = this.props.title;
        return(
            <div className="modal-backdrop"></div>
            <div className="modal">
                <div className="modal-head">
                    <span className="modal-title">{title}</span><span className="modal-close"></span>
                </div>
                <div className="modal-body">{content}</div>
                <div className="modal-footer"></div>
            </div>
        );
    };
}

module.exports = modal;