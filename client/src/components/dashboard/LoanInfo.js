import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '../../App.css';
class LoanInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count:props.count,
            id: props.id,
            loanDate: props.loanDate,
            returnDate: props.returnDate,
        }
    }
    componentDidMount() {
        this.setState({
            count:this.props.count,
            id: this.props.id,
            loanDate: this.props.loanDate,
            returnDate: this.props.returnDate,
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.id !== prevState.id){
            this.setState({
                count:this.props.count,
                id: this.props.id,
                loanDate: this.props.loanDate,
                returnDate: this.props.returnDate,
            })
        }
    }

    render() {
        return (
            <div className="px-4">
                <div className="table-wrapper table-responsive table-bordered ">
                    <table className="table table-hover mb-0" variant='dark' cellSpacing="0" width="100%">
                        <tbody>
                        <tr>
                            <td style={{width:"7%"}}>{this.state.count}</td>
                            <td style={{width:"20%"}}>{this.state.id}</td>
                            <td style={{width:"22%"}}>{this.state.loanDate}</td>
                            <td style={{width:"22%"}}>{this.state.returnDate}</td>
                            <td style={{width:"22%"}}>
                                <button type="button" className="btn btn-primary"><i className="fa fa-eye"/></button>
                                <button type="button" className="btn btn-success"><i className="fa fa-edit"/></button>
                                <button type="button" className="btn btn-danger"><i className="fa fa-trash-o"/></button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );

    }
}
export default LoanInfo;
