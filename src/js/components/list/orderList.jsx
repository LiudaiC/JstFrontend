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

class OrderList extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            listItem: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.updateOper = this.updateOper.bind(this);
    }

    updateOper (e) {
        let _this = this;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        re.post('/orders/revoke', {id: e.target.id}, function (res) {
            _this.props.showList('/orders', _this.props.empId);
        });
    }

    handleClick () {

    }

    componentDidMount () {
        let _this = this;
        let url = _this.props.empId > 0 ? '/orders/users/'+_this.props.empId : '/orders/all';
        re.get(url, function (res) {
            let list = [];
            res.list.forEach(function (e, i) {
                list.push(<tr key={i} onClick={_this.handleClick} className={e.status>0 && 'color-gray'}>
                    <td className="first-td">{e.productName}</td><td>￥ {e.realPrice.toFixed(2)}</td>
                <td>{e.memberName}</td><td>{e.remark}</td><td>{e.empName}</td><td>{e.orderTime}</td>
                <td><a href="javascript:void(0)" onClick={_this.updateOper} id={e.id}>{e.status == 0 && '置为失效'}</a></td></tr>);
            });
            _this.setState({listItem:list, orderNum: res.orderNum, totalAmount: res.totalAmount});
        });
    }

    render () {
        let listItem = this.state.listItem;
        let orderNum = this.state.orderNum;
        let totalAmount = this.state.totalAmount;
        return(
            <div>
            {orderNum > 0 && <span className="jst-personal-order-info">本月完成 {orderNum} 项服务，合计提成￥ {totalAmount.toFixed(2)} 元</span>}
            <table>
                <thead>
                    <tr>
                        <th className="first-td">消费项目</th><th>消费金额（元）</th><th>消费者</th><th>备注</th><th>服务人员</th><th>消费时间</th><th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {listItem}
                </tbody>
            </table>
            </div>
        );
    }

}

module.exports = OrderList;