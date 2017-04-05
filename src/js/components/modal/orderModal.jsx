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

class ProductSelect extends React.Component {
    
    constructor(props) {
        super(props);
    }
}

class OrderModal extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            productId: '',
            realPrice: '',
            memberId: '',
            remark: ''
        };
        this.dataChange = this.dataChange.bind(this);
    }

    dataChange (data) {
        console.log(data);
        this.setState(data);
        this.props.dataChange({data:this.state});
    }

    // Show the modal after initialnized
    componentWillMount() {
        re.get('/products/1/500', function (data) {
            console.log(data);
        });
    }

    render() {
        return(
        <div className="modal-body">
            <div>
            <InputComponent type="text" placeholder="请输入应收金额" name="name" desc="姓名：" dataChange={this.dataChange}/>
            </div>
        </div>
        );
    }
}

module.exports = OrderModal;