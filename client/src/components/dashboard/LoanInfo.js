import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

class LoanInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            loanDate: props.loanDate,
            returnDate: props.returnDate,
        }
    }
    componentDidMount() {
        this.setState({
            id: this.props.id,
            loanDate: this.props.loanDate,
            returnDate: this.props.returnDate,
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.id !== prevState.id){
            this.setState({
                id: this.props.id,
                loanDate: this.props.loanDate,
                returnDate: this.props.returnDate,
            })
        }
    }

    render() {
        return (
            <div className="px-4">
                <h3>Lend to</h3>
                <div className="table-wrapper table-responsive table-bordered ">
                    <table className="table table-hover mb-0" variant='dark' cellSpacing="0" width="100%">
                        <thead>
                        <tr>
                            <th className="th-lg">
                                <a href="_blank">id
                                    <i className="fa fa-sort ml-1"/>
                                </a>
                            </th>
                            <th className="th-lg">
                                <a href="_blank">Loan Date
                                    <i className="fa fa-sort ml-1"/>
                                </a>
                            </th>
                            <th className="th-lg">
                                <a href="_blank">Return Date
                                    <i className="fa fa-sort ml-1"/>
                                </a>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.state.id}</td>
                            <td>{this.state.loanDate}</td>
                            <td>{this.state.returnDate}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );

    }
}
export default LoanInfo;
