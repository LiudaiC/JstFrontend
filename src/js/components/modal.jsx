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
let re = require('../utils/ajax.js');
let dom = require('../utils/dom.js');
let EmployeeModal = require('./employeeModal.jsx');
let MemberModal = require('./memberModal.jsx');
let ProductModal = require('./productModal.jsx');
let OrderModal = require('./orderModal.jsx');

class Modal extends React.Component () {

    constructor (props) {
        super(props);
        this.state = {
            left: 0,
            modalClass: 'modal hide',
            modalBackClass: 'modal-backdrop hide',
            modalDate: {}
        };
        this.saveData = this.saveData.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    dataChange(data) {
        this.setState({modalData:data});
    }

    saveData() {
        let data = this.state.modalData;
        re.post(this.props.type, data, function (res) {
            if (res.success) {
                this.props.closeModal();
            } else {
                alert('操作失败！');
            }
        });
    }

    closeModal() {
        this.setState({modalClass: 'modal hide', modalBackClass:'modal-backdrop hide'});
    }

    componentDidMount() {
        let left = (window.outerWidth - 600) / 2;
        this.setState({modalClass: 'modal', modalBackClass:'modal-backdrop', left: left});
    }

    render (props) {
        let title = this.props.title;
        let type = this.props.type;
        let modalClass = this.state.modalClass;
        let modalBackClass = this.state.modalBackClass;
        let left = this.state.left;
        return(
            <div>
                <div className={modalClass} style={{left:left}}></div>
                <div className="modal">
                    <div className="modal-head">
                        <span className="modal-title"><b>{title}</b></span><i className="modal-close">x</i>
                    </div>
                    <div className="modal-body">
                        {type == '/employees' && <EmployeeModal/>}
                        {type == '/members' && <MemberModal/>}
                        {type == '/products' && <ProductModal/>}
                        {type == '/orders' && <OrderModal/>}
                    </div>
                    <div className="modal-footer">
                        <input type="button" className="btn" value="保&nsbp;&nsbp;&nsbp;&nsbp;存" onClick={this.saveData}/>
                        <input type="button" className="btn cancel" value="取消" onClick={this.closeModal}/>
                    </div>
                </div>
                <div className={modalBackClass}></div>
            </div>
        );
    };
}

module.exports = Modal;