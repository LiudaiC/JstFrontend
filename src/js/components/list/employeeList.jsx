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
        this.props.updateOper('编辑员工', '/employees', e.target.id);
    }

    handleClick (e) {
        this.props.showList('/orders', e.target.parentElement.id);
    }

    componentDidMount () {
        let _this = this;
        re.get('/employees/all', function (res) {
            let list = [];
            res.list.forEach(function (e) {
                let date = new Date(e.joinTime);
                let m = date.getMonth() + 1;
                let d = date.getDate();
                e.rdate = date.getFullYear() + '-'
                + (m < 10 ? '0' + m : m) + '-'+ (d < 10 ? '0' + d :d);
                list.push(<tr id={e.id} key={e.id} onClick={_this.handleClick}>
                    <td className="first-td">{e.name}</td><td>{e.phone}</td><td>{e.address}</td>
                <td>{e.rdate}</td><td><a href="javascript:void(0)" id={e.id} onClick={_this.updateOper}>编辑</a></td></tr>);
            });
            _this.setState({listItem:list});
        });
    }

    render () {
        let listItem = this.state.listItem;
        return(
            <table>
                <thead>
                    <tr>
                        <th className="first-td">姓名</th><th>联系方式</th><th>联系地址</th><th>添加时间</th><th>操作</th>
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