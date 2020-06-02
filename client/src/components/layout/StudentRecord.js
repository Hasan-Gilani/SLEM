import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';


class StudentRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: props.book,
            studentid: props.studentid,
            Sname: props.Sname,
            issuedate: props.issuedate,
            duedate: props.duedate,
            status: props.satus
        }
    }
    componentDidMount() {
        this.setState({
            book: this.props.book,
            studentid: this.props.studentid,
            Sname: this.props.Sname,
            issuedate: this.props.issuedate,
            duedate: this.props.duedate,
            status: this.props.satus
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.studentid !== prevState.studentid){
            this.setState({
                book: this.props.book,
                studentid: this.props.studentid,
                Sname: this.props.Sname,
                issuedate: this.props.issuedate,
                duedate: this.props.duedate,
                status: this.props.satus
            })
        }
    }

    render() {
        return (
                <div className="px-4">
                    <div className="table-wrapper table-responsive table-bordered ">
                        <table className="table table-hover mb-0" variant='dark' cellSpacing="0" width="100%">
                            <thead>
                                <tr>
                                <th>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheckall"/>
                                        <label className="custom-control-label" for="customCheckall">Select all</label>
                                    </div>
                                </th>
                                <th className="th-lg">
                                <a href="_blank">Book
                                    <i className="fa fa-sort ml-1"/>
                                    </a>
                                </th>
                                <th className="th-lg">
                                    <a href="_blank">Student ID
                                    <i className="fa fa-sort ml-1"/>
                                    </a>
                                </th>
                                <th className="th-lg">
                                    <a href="_blank">Name
                                    <i className="fa fa-sort ml-1"/>
                                    </a>
                                </th>
                                <th className="th-lg">
                                    <a href="_blank">Issue Date
                                    <i className="fa fa-sort ml-1"/>
                                    </a>
                                </th>
                                <th className="th-lg">
                                    <a href="_blank">Due Date
                                    <i className="fa fa-sort ml-1"/>
                                    </a>
                                </th>
                                <th className="th-lg">
                                    <a href="_blank">Status
                                    <i className="fa fa-sort ml-1"/>
                                    </a>
                                </th>
                                <th className="th-lg">
                                <a href="_blank">Actions
                                </a>
                                </th>
                                </tr>
                            </thead>

                    <tbody>
                        <tr>
                        <th scope="row">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                <label className="custom-control-label" for="customCheck1"/>
                            </div>
                        </th>
                        <td>{this.state.book}</td>
                        <td>{this.state.studentid}</td>
                        <td>{this.state.Sname}</td>
                        <td>{this.state.issuedate}</td>
                        <td>{this.state.duedate}</td>
                        <td>Status</td>
                        <td>
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
