import React, { Component } from 'react';


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


    render() {
        return (
            <div>
                <h1>ISBN: {this.state.isbn}</h1>
                <h1>Name: {this.state.name}</h1>
                <h1>Author: {this.state.author}</h1>
                <h1>Subject: {this.state.subject}</h1>
            </div>
        );
    }
}

export default Book;