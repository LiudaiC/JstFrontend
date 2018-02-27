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
let InputComponent = require('../inputComponent.jsx');

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
    }

    handleChangeStart (date) {
        let _this = this;
        this.setState({start: date}, function () {
            _this.props.dataChange({startDate: date});
        });
    }

    handleChangeEnd (date) {
        let _this = this;
        this.setState({end:date}, function () {
            _this.props.dataChange({endDate: date});
        })
    }

    componentWillMount() {
        this.props.dataChange({startDate: this.state.start._i, endDate: this.state.end._i});
    }

    render(){
        let start = this.state.start;
        let end = this.state.end;
        return (
            <div className="jst-export-wrapper">
                <div><b>导出时间：</b></div>
                <div className="jst-date">
                从：
                <Calendar
                    name="start"
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
                到：
                <Calendar
                    name="end"
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
            </div>
        )
    }
}

class RadioComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            order: true,
            member: false
        };
        this.dataChange = this.dataChange.bind(this);
    }

    dataChange (e) {
        let tar = e.target;
        let checked = tar.checked;
        if (tar.value == 'order' && checked) {
            this.setState({order: checked, member: !checked});
        }
        if (tar.value == 'member' && checked) {
            this.setState({order: !checked, member: checked});
        }
    }

    render(){

        let orderChecked = this.state.order;
        let memChecked = this.state.member;
        return(
            <div className="jst-export-wrapper">
                <b>导出内容：</b>
                <label><input name="type" value="order" checked={orderChecked} type="radio" onChange={this.dataChange}/>账单</label>
                <label><input name="type" value="member" checked={memChecked} type="radio" onChange={this.dataChange}/>会员</label>
            </div>
        )
    }
}

class ExportModal extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            type: 'order',
            empId: 0,
            startDate: '',
            endDate: ''
        };
        this.dataChange = this.dataChange.bind(this);
    }

    componentWillMount() {
        this.props.dataChange({data: this.state});
    }

    dataChange (data) {
    }


    render() {
        let type = this.state.type;

        return(
        <form action="/jst/export" target="_blank" id="exportForm" className="modal-body">
            <DateComponent dataChange={this.dataChange}/>
            <RadioComponent dataChange={this.dataChange}/>
        </form>
        );
    }
}

module.exports = ExportModal;