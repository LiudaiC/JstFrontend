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

class MemberList extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            listItem: [],
            queryValue: '',
            url: '/members',
            page: 1,
            scrollY: 0,
            dataLoadTip: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.updateOper = this.updateOper.bind(this);
        this.reCharge = this.reCharge.bind(this);
        this.revoke = this.revoke.bind(this);
        this.queryMember = this.queryMember.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    updateOper (e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.updateOper('编辑会员', '/members', e.target.id);
    }

    handleClick (e) {
        this.props.updateOper('会员详情', 'memberInfo', e.target.parentElement.id);
    }

    reCharge (e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.updateOper('充值', '/charge', e.target.id);
    }

    revoke (e) {
        let _this = this;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        re.post('/members/revoke', {id: e.target.id}, function (res) {
            if (res > 0) {
                _this.props.showList('/members');
            }
        });
    }

    queryMember(e) {
        let _this = this;
        let v = e.target.value;
        let url = v ? '/members/query/' + v : '/members';
        _this.setState({queryValue: v, url: url,page:1}, function () {
            _this.refreshList();
        });
    }

    refreshList () {
        let _this = this;
        let page = this.state.page;
        let url = this.state.url;
        re.get(url + '?page=' + page, function (res) {
            let list = page==1?[]:_this.state.listItem;
            let mems = res.list || res;
            mems.length > 0 ?
            mems.forEach(function (e) {
                let date = new Date(e.registerTime);
                let m = date.getMonth() + 1;
                let d = date.getDate();
                let memDiscount = Number(e.memDiscount || 1)
                e.rdate = date.getFullYear() + '-'
                + (m < 10 ? '0' + m : m) + '-'+ (d < 10 ? '0' + d :d);
                list.push(<tr key={e.id+Math.random()} onClick={_this.handleClick} id={e.id} title={e.remark}>
                    <td className="first-td">{e.cardNo}</td><td>{e.name}</td><td>{e.phone}</td>
                    <td>￥ {e.chargeAmount.toFixed(2)}</td><td>￥ {e.extraAmount.toFixed(2)}</td>
                    <td>￥ {e.expenseAmount.toFixed(2)}</td><td>￥ {e.balanceAmount.toFixed(2)}</td>
                    <td>{memDiscount.toFixed(2)}</td>
                    <td title={e.remark}>{e.remark}</td><td>{e.rdate}</td>
                    <td>
                        {e.status ? '已注销' :
                        <span>
                            <a href="javascript:void(0)" id={e.id} onClick={_this.reCharge}>充值</a>
                            <a href="javascript:void(0)" id={e.id} onClick={_this.updateOper}>编辑</a>
                            <a href="javascript:void(0)" id={e.id} onClick={_this.revoke}>注销</a>
                        </span>
                    }
                    </td>
                </tr>);
            }) : (!list.length && list.push(<tr key="0"><td colSpan="10" className="no-data">暂无数据</td></tr>));
            _this.setState({listItem: list, page: page, dataLoadTip: mems.length < 30 ? '数据加载完毕' : '', url: url});
        });
    }

    componentDidMount () {
        this.refreshList();
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
                    this.refreshList();
                });
            }
        }

    }

    render () {
        let listItem = this.state.listItem;
        let queryValue = this.state.queryValue;
        let dataLoadTip = this.state.dataLoadTip;
        return(
            <div>
            <div className="member-input-query">
                <input placeholder="请输入会员姓名、会员号或手机号" onChange={this.queryMember} value={queryValue}/>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="first-td">会员号</th><th>姓名</th><th>联系方式</th><th>充值金额（元）</th>
                        <th>赠送金额（元）</th><th>消费金额（元）</th><th>余额（元）</th><th>会员折扣</th><th>症状备注</th><th>注册时间</th><th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {listItem.length > 0 && listItem}
                </tbody>
            </table>
            {listItem.length > 0 && <div className="jst-data-load">{dataLoadTip}</div>}
            </div>
        );
    }

}

module.exports = MemberList;

