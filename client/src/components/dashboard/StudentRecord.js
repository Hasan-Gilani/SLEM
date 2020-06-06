import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '../../App.css';

class StudentRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count:props.count,
            isbn: props.isbn,
            studentid: props.studentid,
            issuedate: props.issuedate,
            duedate: props.duedate
        }
    }
    componentDidMount() {
        this.setState({
            count:this.props.count,
            isbn: this.props.isbn,
            studentid: this.props.studentid,
            issuedate: this.props.issuedate,
            duedate: this.props.duedate
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.studentid !== prevState.studentid){
            this.setState({
                count:this.props.count,
                isbn: this.props.isbn,
                studentid: this.props.studentid,
                issuedate: this.props.issuedate,
                duedate: this.props.duedate
            })
        }
    }

    render() {
        return (
                <div className="px-4">
                    <div className="table-wrapper table-responsive table-bordered ">
                        <table className="table table-hover mb-0" variant='dark' cellSpacing="0" width="100%">
                            <tbody >
                                <tr>
                                {/* <th scope="row" style={{width:"4%"}}>
                                    <div className="custom-control custom-checkbox" style={{width:"10%"}}>
                                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                        <label className="custom-control-label" for="customCheck1"/>
                                    </div>
                                </th> */}
                                <td style={{width:"5%"}}>{this.state.count}</td>
                                <td style={{width:"19%"}}>{this.state.isbn}</td>
                                <td style={{width:"15%"}}>{this.state.studentid}</td>
                                <td style={{width:"20%"}}>{this.state.issuedate}</td>
                                <td style={{width:"20%"}}>{this.state.duedate}</td>
                                <td style={{width:"20%"}}>
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
export default StudentRecord;