/**
 *
 *
 * @Description This component is designed to make the list page to be pageable.
 *
 *
 *
 *
 */

let React = require('react');
let ReactDOM = require('react-dom');
let dom = require('../utils/dom.js');


class PageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            pageNum: this.props.pageNum,
            pageSize: 20,
            total: this.props.total,
            type: this.props.type,
            empId: this.props.empId,
            inputNum: 1
        }
    }

    handleClick (e) {
        let t = e.target;
        let v = t.id;
        let total = this.state.total;
        let pageSize = this.state.pageSize;
        let type = this.state.type;
        let empId = this.state.empId;
        let inputNum = this.state.inputNum;
        switch (v) {
            case -1:
                v = 1;
                break;
            case -2:
                v = v - 1;
                break;
            case -3:
                v = v + 1;
                break;
            case -4:
                v = total/pageSize;
                break;
            case -5:
                v = inputNum;
                break;
        }
        this.setState({pageNum: v, inputNum: v}, function () {
            this.props.showList(type, empId, v);
            this.props.updatePage(total, v, type, empId)
        });
    }

    onChange (e) {
        this.setState(inputNum: e.target.value);
    }

    render(){
        let pageNum = this.state.pageNum;
        let pageSize = this.state.pageSize;
        let inputNum = this.state.inputNum;
        let total = this.state.total;
        let listDom = [];
        listDom.push(<li key="-1" id="-1">&lt;&lt;</li>);
        listDom.push(<li key="-2" id="-2">&lt;</li>);
        for (let i = 1;i <= this.state.total; i++) {
            listDom.push(<li key={i} id={i} className={pageNum == i ? 'active' : ''}>{i}</li>);
        }
        listDom.push(<li key="-3" id="-3">&gt;</li>);
        listDom.push(<li key="-4" id="-4">&gt;&gt;</li>);
        listDom.push(<li key="-11" className="disabled">第</li>);
        listDom.push(<li key="-12"><input className="pageNumInput" value={inputNum} onChange={this.onChange}/></li>);
        listDom.push(<li key="-13" className="disabled">页</li>);
        listDom.push(<li key="-21" id="-5">Go</li>);
        return(
            <ul onClick={this.handleClick} className="jst-page-component">{listDom}</ul>
        );
    }
}


module.exports = PageComponent;