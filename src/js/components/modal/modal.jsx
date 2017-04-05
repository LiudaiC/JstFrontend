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
let EmployeeModal = require('./employeeModal.jsx');
let MemberModal = require('./memberModal.jsx');
let ProductModal = require('./productModal.jsx');
let OrderModal = require('./orderModal.jsx');

class Modal extends React.Component {

    // Extends props from ancestor
    // Set base parameter for modal
    // Bind context to special function
    constructor (props) {
        super(props);
        this.state = {
            data: {},
            left: 0,
            modalClass: 'modal',
            modalBackClass: 'modal-backdrop'
        };
        this.handleClick = this.handleClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.dataChange = this.dataChange.bind(this);
    }

    // Submit data to server
    // Close modal if submit success
    // Show alter message if fail
    handleClick() {
        let _this = this;
        let data = _this.state.data;
        let msg = '操作失败！';
        re.post(_this.props.type, data, function (res) {
            if (res) {
                _this.closeModal();
            } else {
                switch (res) {
                    case -1:
                    msg = '登录账号已使用，请重新设置！';
                }
                alert(msg);
            }
        });
    }

    // Change the context data in the modal input
    dataChange(data) {
        this.setState(data);
    }

    // Close the modal
    closeModal() {
        this.props.closeModal();
    }

    // Show the modal after initialnized
    componentDidMount() {
        let left = (window.innerWidth-600)/2;
        this.setState({left:left});
    }

    // Render the modal based on source data related.
    render (props) {
        let title = this.props.title;
        let type = this.props.type;
        let modalClass = this.state.modalClass;
        let modalBackClass = this.state.modalBackClass;
        let left = this.state.left;
        return(
            <div>
                <div className={modalClass} style={{left:left}}>
                    <div className="modal-head">
                        <span className="modal-title">{title}</span><i className="modal-close"></i>
                    </div>
                    {type == '/employees' && <EmployeeModal dataChange={this.dataChange}/>}
                    {type == '/members' && <MemberModal dataChange={this.dataChange}/>}
                    {type == '/products' && <ProductModal dataChange={this.dataChange}/>}
                    {type == '/orders' && <OrderModal dataChange={this.dataChange}/>}
                    <div className="modal-footer">
                        <input type="button" className="btn" value="保存" onClick={this.handleClick}/>
                    </div>
                </div>
                <div className={modalBackClass}></div>
            </div>
        );
    };
}

module.exports = Modal;