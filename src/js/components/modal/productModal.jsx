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

class ProductModal extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            productName:'',
            originalPrice: '',
            vipPrice: '',
            discountPrice: ''
        };
        this.dataChange = this.dataChange.bind(this);
    }

    dataChange (data) {
        console.log(data);
        this.setState(data);
        this.props.dataChange({data:this.state});
    }


    render() {
        return(
        <div className="modal-body">
            <div>
            <InputComponent type="text" placeholder="请输入商品名称" name="productName" desc="商品名称：" dataChange={this.dataChange}/>
            </div>
            <div>
            <InputComponent type="text" placeholder="请输入原价" name="originalPrice" desc="原价：" dataChange={this.dataChange}/>
            </div>
            <div>
            <InputComponent type="text" placeholder="请输入会员价" name="vipPrice" desc="会员价：" dataChange={this.dataChange}/>
            </div>
            <div>
            <InputComponent type="text" placeholder="请输入活动价" name="discountPrice" desc="活动价：" dataChange={this.dataChange}/>
            </div>
        </div>
        );
    }
}

module.exports = ProductModal;