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

class ServiceChange extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        let num = this.props.num;
        return (
            <div>
                <span>找零：</span>￥ {num} 元
            </div>
        )
    }
}

class ProductSelect extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            listItem: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    // Show the modal after initialnized
    componentWillMount() {
        let _this = this;
        re.get('/products/all', function (res) {
            if (res && res.list) {
                let listItem = res.list.map(e => (<option key={e.id} 
                    value={e.id+','+e.originalPrice+','+e.vipPrice+','+e.productName}>{e.productName}</option>));
                _this.setState({listItem: listItem});
                let firstItem = res.list[0];
                if (firstItem) {
                    _this.props.dataChange({
                        productId: firstItem.id,
                        originPrice: firstItem.originalPrice,
                        vipPrice: firstItem.vipPrice,
                        name: firstItem.productName
                    });
                }
            }
        });
    }

    handleChange (e) {
        let t = e.target;
        let v = t.value.split(',');
        this.props.dataChange({
            productId: v[0],
            originPrice: v[1],
            vipPrice: v[2],
            name: v[3]
        });
    }

    render () {
        let listItem = this.state.listItem;
        return(
            <div>
            <span>消费服务：</span><select onChange={this.handleChange}>{listItem}</select>
            </div>
        );
    }
}

class EmpSelect extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            listItem: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    // Show the modal after initialnized
    componentWillMount() {
        let _this = this;
        re.get('/employees/all', function (res) {
            if (res && res.list) {
                let listItem = res.list.map(e => (<option key={e.id} value={e.id}>{e.name}</option>));
                _this.setState({listItem: listItem});
                let firstItem = res.list[0];
                if (firstItem) {
                    _this.props.dataChange({
                        empId: firstItem.id
                    });
                }
            }
        });
    }

    handleChange (e) {
        let t = e.target;
        let v = t.value;
        this.props.dataChange({empId:v});
    }

    render () {
        let listItem = this.state.listItem;
        return(
            <div>
            <span>服务人员：</span><select onChange={this.handleChange}>{listItem}</select>
            </div>
        );
    }
}


class QueryResultComponent extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            listItem: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (e) {
        this.props.dataChange({memberId: e.target['data-id']});
    }

    render () {
        let listItem = this.props.listItem;
        return (
            <ul className="jst-mem">
                {listItem}
            </ul>
        );
    }

}


class OrderModal extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            str: '',
            error: '',
            empId: 0,
            listItem: '',
            originPrice: 0,
            vipPrice: 0,
            discount: 1,
            productId: 0,
            realCharge: 0,
            realPrice: 0,
            memberId: '',
            balance: -1,
            serviceList: [],
            changeAmount: 0,
            pids:[],
            remark: ''
        };
        this.dataChange = this.dataChange.bind(this);
        this.liClick = this.liClick.bind(this);
        this.serviceClick = this.serviceClick.bind(this);
    }

    serviceClick (e) {
        let serviceList = this.state.serviceList;
        let pids = this.state.pids;
        let originPrice = this.state.originPrice;
        let vipPrice = this.state.vipPrice;
        for(let i = 0, l = serviceList.length; i < l; i++) {
            if (serviceList[i].key == e.target.id) {
                serviceList.splice(i, 1);
                pids.splice(i, 1);
                originPrice -= e.target.dataset.originprice;
                vipPrice -= e.target.dataset.vipprice;
                break;
            }
        }
        let _this = this;
        this.setState({serviceList: serviceList, pids: pids, originPrice: originPrice, vipPrice: vipPrice}, function () {
            _this.props.dataChange({data: _this.state});
        });
    }

    liClick (e) {
        let t = e.target;
        let d = t.dataset;
        this.refs.memName.changeValue(d.name);
        let vipPrice = this.state.vipPrice;
        this.dataChange({
            memberId: d.id,
            balance: d.balance,
            vipPrice: vipPrice,
            discount: d.discount,
            str:''
        });
    }

    dataChange (data) {
        let _this = this;
        if (data.hasOwnProperty('productId')) {
            let pids = _this.state.pids;
            let originPrice = pids.length ? _this.state.originPrice : 0;
            let vipPrice = pids.length ? _this.state.vipPrice : 0;
            _this.setState({originPrice: originPrice, vipPrice: vipPrice}, function () {
                let list = _this.state.serviceList;
                for(let i = 0, l = pids.length; i < l; i++) {
                    if (pids[i] == +data.productId) {
                        data.originPrice = originPrice;
                        data.vipPrice = vipPrice;
                        return;
                    }
                }
                pids.push(+data.productId);
                originPrice += +data.originPrice;
                vipPrice += +data.vipPrice;
                list.push(<span key={data.name+data.productId} id={data.productId}>{data.name}<b id={data.name+data.productId}
                 data-originPrice={data.originPrice} data-vipPrice={data.vipPrice} onClick={_this.serviceClick}>x</b></span>);
                _this.setState({serviceList: list, pids: pids, vipPrice: vipPrice, originPrice: originPrice}, function () {
                    _this.props.dataChange({data:_this.state});
                });
            });
        } else {

            if (data.realCharge) {
                data.changeAmount = data.realCharge - _this.state.realPrice;
            }
            if (data.realPrice) {
                data.changeAmount = _this.state.realCharge - data.realPrice;
            }
            if (!data.realPrice && !data.realCharge) {
                data.changeAmount = 0 - _this.state.realPrice;
            }
            _this.setState(data, function () {
                let errorMsg = +_this.state.balance > 0 && +_this.state.memberId > 0
                    && +_this.state.realPrice > +_this.state.balance ? '会员余额不足' : '';
                _this.setState({error: errorMsg});
                _this.props.dataChange({data: _this.state});
            });
            if (data.hasOwnProperty('str') && data['str'].length) {
                let str = data['str'];
                let reg = new RegExp(str, 'g');
                re.get('/members/query/' + str, function (res) {
                    if (res.length) {
                        let list = res.map(e => (<li data-id={e.id} data-balance={e.balanceAmount}
                         data-name={e.name+'('+e.cardNo+')' + ' -- ' + e.memDiscount.toFixed(2)} key={e.id} data-discount={e.memDiscount}
                        onClick={_this.liClick}>{e.name}({e.cardNo})({e.phone}) -- 折扣({e.memDiscount.toFixed(2)})</li>));
                        _this.setState({listItem: list});
                    } else {
                        _this.setState({str:''});
                    }
                });
            }
        }
    }

    render() {
        let originPrice = this.state.originPrice;
        let vipPrice = this.state.vipPrice;
        let discount = this.state.discount;
        let realPrice = this.state.realPrice;
        let str = this.state.str;
        let balance = this.state.balance;
        let error = this.state.error;
        let listItem = this.state.listItem;
        let changeAmount = this.state.changeAmount;
        let realCharge = this.state.realCharge;
        let serviceList = this.state.serviceList;
        return(
        <div className="modal-body">
            <div className="jst-service-list">{serviceList}</div>
            <ProductSelect dataChange={this.dataChange}/>
            <EmpSelect dataChange={this.dataChange}/>
            <div id="queryMember">
            <InputComponent type="text" placeholder="请输入会员姓名、电话或会员号" name="str" ref="memName" desc="会员：" dataChange={this.dataChange}/>
            {balance>0 && <span className="jst-mem-balance">余额：￥ {balance} 元</span>}
            {balance == 0 && <span className="jst-mem-balance">余额：￥ 0 元</span>}
            {str && <QueryResultComponent str={str} listItem={listItem}/> }
            </div>
            <div>
            <span>服务原价：</span><span className="jst-amount color-orange">￥  {originPrice}</span>元
            </div>
            <div>
            <span>会员价：</span><span className="jst-amount color-orange">￥ {vipPrice * discount}</span>元
            </div>
            <div>
            <InputComponent type="text" placeholder="请输入实收金额" name="realCharge" 
            desc="实收金额：" dataChange={this.dataChange}/>
            </div>
            <div>
            <InputComponent type="text" placeholder="请输入应收金额" name="realPrice" 
            desc="应收金额：" dataChange={this.dataChange}/>
            </div>
            <ServiceChange num={changeAmount}/>
            {balance > 0 && <div>会员本次结余：￥ {balance - realPrice} 元</div>}
            <div>
            {changeAmount < 0 && <span className="color-red jst-msg">傻啊，钱收少了！</span>}
            </div>
            <div>
            <InputComponent type="text" placeholder="请输入订单备注" name="remark" 
            desc="备注：" dataChange={this.dataChange}/>
            </div>
            <div>
            <span className="color-red">{error}</span>
            </div>
        </div>
        );
    }
}

module.exports = OrderModal;