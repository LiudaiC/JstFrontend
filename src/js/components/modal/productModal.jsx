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
            id: 0,
            productName: '',
            originalPrice: '',
            vipPrice: '',
            discountPrice: '',
            proportion: ''
        };
        this.dataChange = this.dataChange.bind(this);
        this.changeId = this.changeId.bind(this);
    }

    changeId(){
        this.setState({id:-1});
    }

    componentWillMount() {
        let _this = this;
        let prop = _this.props;
        if (prop.typeId > 0) {
            re.get(prop.type+'/'+prop.typeId, function (res) {
                _this.dataChange({
                    id: prop.typeId,
                    productName: res.productName || '',
                    originalPrice: res.originalPrice || '',
                    vipPrice: res.vipPrice || '',
                    discountPrice: res.discountPrice || '',
                    proportion: res.proportion || ''
                });
            })
        }
    }

    dataChange (data) {
        let _this = this;
        _this.setState(data, function () {
            _this.props.dataChange({data: _this.state});
        });
    }


    render() {
        let id = this.state.id;
        let productName = this.state.productName;
        let originalPrice = this.state.originalPrice;
        let vipPrice = this.state.vipPrice;
        let discountPrice = this.state.discountPrice;
        let proportion = this.state.proportion;
        return(
        <div className="modal-body">
            <div>
            {id != 0 && <InputComponent type="text" placeholder="请输入商品名称" value={productName} name="productName" desc="商品名称：" dataChange={this.dataChange}/>}
            </div>
            <div>
            {id != 0 && <InputComponent type="text" placeholder="请输入原价" value={originalPrice} name="originalPrice" desc="原价：" dataChange={this.dataChange}/>}
            </div>
            <div>
            {id != 0 && <InputComponent type="text" placeholder="请输入会员价" value={vipPrice} name="vipPrice" desc="会员价：" dataChange={this.dataChange}/>}
            </div>
            <div>
            {id != 0 && <InputComponent type="text" placeholder="请输入活动价" value={discountPrice} name="discountPrice" desc="活动价：" dataChange={this.dataChange}/>}
            </div>
            <div>
            {id != 0 && <InputComponent type="text" placeholder="请输入分成比例" value={proportion} name="proportion" desc="项目分成：" dataChange={this.dataChange}/>}
            </div>
        </div>
        );
    }
}

module.exports = ProductModal;