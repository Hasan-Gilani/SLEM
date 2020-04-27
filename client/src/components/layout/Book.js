import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

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
            <div className="container p-5 rounded mb-0 block-example border border-light">
                <Table responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>ISBN</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>{this.state.isbn}</td>
                        <td>{this.state.name}</td>
                        <td>{this.state.author}</td>
                        <td>{this.state.subject}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Book;