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
            listItem: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.updateOper = this.updateOper.bind(this);
    }

    updateOper (e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.updateOper('编辑产品', '/products', e.target.id);
    }

    handleClick () {

    }

    componentDidMount () {
        let _this = this;
        re.get('/products/all?page=1', function (res) {
            let list = [];
            res.list.forEach(function (e) {
                let date = new Date(e.updateTime);
                let m = date.getMonth() + 1;
                let d = date.getDate();
                e.rdate = date.getFullYear() + '-'
                + (m < 10 ? '0' + m : m) + '-'+ (d < 10 ? '0' + d :d);
                list.push(<tr key={e.id} onClick={_this.handleClick}>
                    <td className="first-td">{e.productName}</td><td>￥ {e.originalPrice.toFixed(2)}</td><td>￥ {e.vipPrice.toFixed(2)}</td>
                <td>￥ {e.discountPrice.toFixed(2)}</td><td>{e.rdate}</td><td><a href="javascript:void(0)" id={e.id} onClick={_this.updateOper}>编辑</a></td></tr>);
            });
            _this.setState({listItem:list});
        });
    }

    render () {
        let listItem = this.state.listItem;
        let right = window.jstRight;
        return(
            <table>
                <thead>
                    <tr>
                        <th className="first-td">产品名称</th><th>原价（元）</th><th>会员价（元）</th><th>活动价（元）</th><th>更新时间</th><th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {listItem}
                </tbody>
            </table>
        );
    }

}

module.exports = MemberList;