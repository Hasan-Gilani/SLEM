import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            isbn: props.isbn,
            subject: props.subject,
            copies: props.copies
        }
    }
    componentDidMount() {
        this.setState({
            title: this.props.title,
            isbn: this.props.isbn,
            subject: this.props.subject,
            copies: this.props.copies
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.isbn !== prevState.isbn){
            this.setState({
                isbn: this.props.isbn,
                title: this.props.title,
                subject: this.props.subject,
                copies: this.props.copies
            })
        }
    }

    render() {
        return (
            <div className="px-4">
                <h3>Book Details</h3>
                <div className="table-wrapper table-responsive table-bordered ">
                    
                    <table className="table table-hover mb-0" variant='dark' cellSpacing="0" width="100%">
                        <thead>
                        <tr>
                            <th className="th-lg">
                                <a href="_blank">ISBN
                                    <i className="fa fa-sort ml-1"/>
                                </a>
                            </th>
                            <th className="th-lg">
                                <a href="_blank">Title
                                    <i className="fa fa-sort ml-1"/>
                                </a>
                            </th>
                            <th className="th-lg">
                                <a href="_blank">Subject
                                    <i className="fa fa-sort ml-1"/>
                                </a>
                            </th>
                            <th className="th-lg">
                                <a href="_blank">Status
                                    <i className="fa fa-sort ml-1"/>
                                </a>
                            </th>
                            
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>{this.state.isbn}</td>
                            <td>{this.state.title}</td>
                            <td>{this.state.subject}</td>
                            <td>{(this.state.copies > 0) ? 'Available' : "All copied Loaned"}</td>
                            
                        </tr>
                        </tbody>

                    </table>

                </div>

            </div>
        );

    }
}
export default Book;
