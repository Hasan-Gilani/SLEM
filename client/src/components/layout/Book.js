import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';


class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            author: props.author,
            subject: props.author

        }
    }
    componentDidMount() {
        this.setState({
            title: this.props.title,
            isbn: this.props.isbn,
            subject: this.props.subject
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.isbn !== prevState.isbn){
            this.setState({
                isbn: this.props.isbn,
                title: this.props.title,
                subject: this.props.subject
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
                                    <label className="custom-control-label" htmlFor="customCheckall">Select all</label>
                                </div>
                            </th>
                            <th className="th-lg">
                                <a href="">ISBN
                                    <i className="fa fa-sort ml-1"/>
                                </a>
                            </th>
                            <th className="th-lg">
                                <a href="">Name
                                    <i className="fa fa-sort ml-1"/>
                                </a>
                            </th>
                            <th className="th-lg">
                                <a href="">Author
                                    <i className="fa fa-sort ml-1"/>
                                </a>
                            </th>
                            <th className="th-lg">
                                <a href="">Status
                                    <i className="fa fa-sort ml-1"/>
                                </a>
                            </th>
                            <th className="th-lg">
                                <a href="">Actions
                                </a>
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <th scope="row">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                    <label className="custom-control-label" htmlFor="customCheck1"/>
                                </div>
                            </th>
                            <td>{this.state.isbn}</td>
                            <td>{this.state.name}</td>
                            <td>{this.state.author}</td>
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
export default Book;
