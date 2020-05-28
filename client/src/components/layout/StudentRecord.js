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
                <div class="px-4">
                    <div class="table-wrapper table-responsive table-bordered ">
                        <table class="table table-hover mb-0" variant='dark' cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                <th>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="customCheckall"></input>
                                        <label class="custom-control-label" for="customCheckall">Select all</label>
                                    </div>
                                </th>
                                <th class="th-lg">
                                <a href="">Book
                                    <i class="fa fa-sort ml-1"></i>
                                    </a>
                                </th>
                                <th class="th-lg">
                                    <a href="">Student ID
                                    <i class="fa fa-sort ml-1"></i>
                                    </a>
                                </th>
                                <th class="th-lg">
                                    <a href="">Name
                                    <i class="fa fa-sort ml-1"></i>
                                    </a>
                                </th>
                                <th class="th-lg">
                                    <a href="">Issue Date
                                    <i class="fa fa-sort ml-1"></i>
                                    </a>
                                </th>
                                <th class="th-lg">
                                    <a href="">Due Date
                                    <i class="fa fa-sort ml-1"></i>
                                    </a>
                                </th>
                                <th class="th-lg">
                                    <a href="">Status
                                    <i class="fa fa-sort ml-1"></i>
                                    </a>
                                </th>
                                <th class="th-lg">
                                <a href="">Actions
                                </a>
                                </th>
                                </tr>
                            </thead>
                    
                    <tbody>
                        <tr>
                        <th scope="row">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="customCheck1"></input>
                                <label class="custom-control-label" for="customCheck1"></label>
                            </div>
                        </th>
                        <td>{this.state.book}</td>
                        <td>{this.state.studentid}</td>
                        <td>{this.state.Sname}</td>
                        <td>{this.state.issuedate}</td>
                        <td>{this.state.duedate}</td>
                        <td>Status</td>
                        <td>
                            <button type="button" class="btn btn-primary"><i class="fa fa-eye"></i></button>
                            <button type="button" class="btn btn-success"><i class="fa fa-edit"></i></button>
                            <button type="button" class="btn btn-danger"><i class="fa fa-trash-o"></i></button>
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