import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';


class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isbn: props.isbn,
            name: props.name,
            author: props.author,
            subject: props.author
        }
    }
    componentDidMount() {
        this.setState({
            author: this.props.author,
            name: this.props.name,
            isbn: this.props.isbn,
            subject: this.props.subject
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.isbn !== prevState.isbn){
            this.setState({
                isbn: this.props.isbn,
                author: this.props.author,
                name: this.props.name,
                subject: this.props.subject
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
                                <a href="">ISBN
                                    <i class="fa fa-sort ml-1"></i>
                                    </a>
                                </th>
                                <th class="th-lg">
                                    <a href="">Name
                                    <i class="fa fa-sort ml-1"></i>
                                    </a>
                                </th>
                                <th class="th-lg">
                                    <a href="">Author
                                    <i class="fa fa-sort ml-1"></i>
                                    </a>
                                </th>
                                <th class="th-lg">
                                    <a href="">Subject
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
                        <td>{this.state.isbn}</td>
                        <td>{this.state.name}</td>
                        <td>{this.state.author}</td>
                        <td>{this.state.subject}</td>
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
export default Book;