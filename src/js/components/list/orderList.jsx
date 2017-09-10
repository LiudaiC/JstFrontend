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
import Calendar from 'react-datepicker';
import moment from 'moment';

require('react-datepicker/dist/react-datepicker.css');


class MyComponent extends React.Component {

    constructor (props) {
        super(props);
        let date = new Date();
        let sy = date.getFullYear();
        let sm = date.getMonth() + 1;
        date.setDate(1);
        date.setMonth(sm);
        date.setDate(0);
        let ed = date.getDate();
        let ym = sy + '-' + (sm < 10 ? '0' + sm : sm);
        this.state = {
            start: moment(ym + '-01'),
            end: moment(ym + '-' + ed)
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChangeStart (date) {
        this.setState({start: date});
    }

    handleChangeEnd (date) {
        this.setState({end: date});   
    }

    handleClick () {
        let start = dom.getById('start').value;
        let end = dom.getById('end').value;
        this.props.changeList(start, end);
    }

    render(){
        let start = this.state.start;
        let end = this.state.end;
        return (
            <div className="jst-date-wrapper">
                <div className="jst-date">
                开始时间：
                <Calendar
                    locale='zh-cn'
                    selected={start}
                    selectsStart
                    dateFormat='YYYY-MM-DD'
                    startDate={start}
                    endDate={end}
                    onChange={this.handleChangeStart}
                    id='start'
                />
                </div>
                <div className="jst-date">
                结束时间：
                <Calendar
                    locale='zh-cn'
                    selected={end}
                    dateFormat='YYYY-MM-DD'
                    selectsEnd
                    startDate={start}
                    endDate={end}
                    onChange={this.handleChangeEnd}
                    id='end'
                />
                </div>
                <button className="btn" onClick={this.handleClick}>查询</button>
            </div>
        )
    }
}

class OrderList extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            listItem: '',
            orderNum: 0,
            totalAmount: 0
        }
        this.changeList = this.changeList.bind(this);
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

    changeList (start, end) {
        let _this = this;
        let url = _this.props.empId > 0 ? '/orders/users/'+_this.props.empId : '/orders/all';
        if (start || end) {
            url += '?start='+start+'&end='+end;
        }
        re.get(url, function (res) {
            let list = [];
            res.list.length > 0 ?
            res.list.forEach(function (e, i) {
                list.push(<tr key={i} onClick={_this.handleClick} className={e.status>0 && 'color-gray'}>
                    <td className="first-td">{e.productName}</td><td>￥ {e.realPrice.toFixed(2)}</td>
                <td>{e.memberName}</td><td>{e.remark}</td><td>{e.empName}</td><td>{e.orderTime}</td>
                <td><a href="javascript:void(0)" onClick={_this.updateOper} id={e.id}>{e.status == 0 && '置为失效'}</a></td></tr>);
            }) : list.push(<tr key="1"><td colSpan="7" className="jst-text-center">暂无数据</td></tr>);
            _this.setState({listItem:list, orderNum: res.orderNum, totalAmount: _this.props.empId > 0 ? res.totalAmount : res.realAmount});
        });
    }

    componentDidMount () {
        this.changeList();
    }

    render () {
        let listItem = this.state.listItem;
        let orderNum = this.state.orderNum;
        let totalAmount = this.state.totalAmount;
        return(
            <div>
            {orderNum > 0 && <span className="jst-personal-order-info">共完成 {orderNum} 项服务，合计￥ {totalAmount.toFixed(2)} 元</span> 
            }
            <MyComponent changeList={this.changeList}/>
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