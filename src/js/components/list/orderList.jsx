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


class DateComponent extends React.Component {

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
        this.props.changeList(1, start, end);
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
            listItem: [],
            orderNum: 0,
            totalAmount: 0,
            scrollY: 0,
            dataLoadTip: '',
            start: '',
            end:'',
            url: '',
            page: 1
        }
        this.changeList = this.changeList.bind(this);
        this.updateOper = this.updateOper.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    updateOper (e) {
        let _this = this;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        re.post('/orders/revoke', {id: e.target.id}, function (res) {
            _this.props.showList('/orders', _this.props.empId);
        });
    }

    changeList (search_page, s_start, s_end) {
        let _this = this;
        let page = search_page || this.state.page;
        let start = s_start || this.state.start;
        let end = s_end || this.state.end;
        let url = _this.props.empId > 0 ? '/orders/users/'+_this.props.empId : '/orders';
        if (start || _this.state.start) {
            url += '?start=' + start + '&end=' + end + '&page=' + page;
        } else {
            url += '?page=' + page;
        }
        re.get(url, function (res) {
            let list = page == 1?[]:_this.state.listItem;
            let orderNum = page == 1?res.orderNum:_this.state.orderNum + res.orderNum;
            let totalAmount = page == 1?(_this.props.empId > 0 ? res.totalAmount : res.realAmount):_this.state.totalAmount + (_this.props.empId > 0 ? res.totalAmount : res.realAmount);
            let dataLoadTip = res.list.length < 30 ? '数据加载完毕' : '';
            res.list.length > 0 ?
            res.list.forEach(function (e, i) {
                list.push(<tr key={e.id+Math.random()*1000} onClick={_this.handleClick} className={e.status>0 && 'color-gray'}>
                    <td className="first-td">{e.productName}</td><td>￥ {e.realPrice.toFixed(2)}</td>
                <td>{e.memberName}</td><td>{e.remark}</td><td>{e.empName}</td><td>{e.orderTime}</td>
                <td>{e.status == 0 ? <a href="javascript:void(0)" onClick={_this.updateOper} id={e.id}>置为失效</a> : '无效订单'}</td></tr>);
            }) : (!list.length && list.push(<tr key="0"><td colSpan="7" className="jst-text-center">暂无数据</td></tr>));
            _this.setState({listItem:list, orderNum: orderNum, totalAmount: totalAmount, page: page, dataLoadTip: dataLoadTip, start:start,end:end});
        });
    }

    componentDidMount () {
        this.changeList();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll (e) {
        let _this = this;
        let scrollY = window.pageYOffset;
        if (scrollY - this.state.scrollY > 0) {
            if (document.body.scrollHeight - dom.getByTag('table')[0].offsetHeight < 300 && this.state.dataLoadTip == '') {
                this.setState({
                    scrollY: scrollY,
                    page: _this.state.page + 1,
                    dataLoadTip: '数据加载中......'
                }, function () {
                    _this.changeList();
                });
            }
        }

    }

    render () {
        let listItem = this.state.listItem;
        let orderNum = this.state.orderNum;
        let totalAmount = this.state.totalAmount;
        let dataLoadTip = this.state.dataLoadTip;
        return(
            <div>
            {orderNum > 0 && <span className="jst-personal-order-info">当前显示 {orderNum} 项服务，合计￥ {totalAmount.toFixed(2)} 元</span> 
            }
            <DateComponent changeList={this.changeList}/>
            <table>
                <thead>
                    <tr>
                        <th className="first-td">消费项目</th><th>消费金额（元）</th><th>消费者</th><th>备注</th><th>服务人员</th><th>消费时间</th><th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {listItem.length > 0 && listItem}
                </tbody>
            </table>
            <div className="jst-data-load">{dataLoadTip}</div>
            </div>
        );
    }

}

module.exports = OrderList;