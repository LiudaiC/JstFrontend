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
            page: 1,
            scrollY: 0,
            dataLoadTip: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.updateOper = this.updateOper.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    updateOper (e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.updateOper('编辑产品', '/products', e.target.id);
    }

    handleClick () {

    }

    changeList () {
        let _this = this;
        let page = this.state.page;
        re.get('/products?page=' + page, function (res) {
            let list = _this.state.listItem;
            res.list.length > 0 ?
            res.list.forEach(function (e) {
                let date = new Date(e.updateTime);
                let m = date.getMonth() + 1;
                let d = date.getDate();
                e.rdate = date.getFullYear() + '-'
                + (m < 10 ? '0' + m : m) + '-'+ (d < 10 ? '0' + d :d);
                list.push(<tr key={e.id} onClick={_this.handleClick}>
                    <td className="first-td">{e.productName}</td><td>￥ {e.originalPrice.toFixed(2)}</td><td>￥ {e.vipPrice.toFixed(2)}</td>
                <td>￥ {e.discountPrice.toFixed(2)}</td><td>{e.rdate}</td><td><a href="javascript:void(0)" id={e.id} onClick={_this.updateOper}>编辑</a></td></tr>);
            }) : (list.length == 0 && list.push(<tr key="0"><td colSpan="6" className="jst-text-center">暂无数据</td></tr>));
            _this.setState({listItem: list, dataLoadTip: res.list.length < 30 ? '数据加载完毕' : ''});
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
        let right = window.jstRight;
        let dataLoadTip = this.state.dataLoadTip;
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th className="first-td">产品名称</th><th>原价（元）</th><th>会员价（元）</th><th>活动价（元）</th><th>更新时间</th><th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItem.length  > 0 && listItem}
                    </tbody>
                </table>
                {listItem.length > 0 && <div className="jst-data-load">{dataLoadTip}</div>}
            </div>
        );
    }

}

module.exports = MemberList;