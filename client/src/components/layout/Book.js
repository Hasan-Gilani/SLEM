import React, { Component } from 'react';


class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isbn: props.isbn,
            title: props.title,
            author: props.author,
            subject: props.author
        }
    }
    componentDidMount() {
        this.setState({
            author: this.props.author,
            title: this.props.title,
            isbn: this.props.isbn,
            subject: this.props.subject
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.isbn !== prevState.isbn){
            this.setState({
                isbn: this.props.isbn,
                author: this.props.author,
                title: this.props.title,
                subject: this.props.subject
            })
        }
    }

    render() {
        return (
            <div>
                <h1>ISBN: {this.state.isbn}</h1>
                <h1>Name: {this.state.title}</h1>
                <h1>Author: {this.state.author}</h1>
                <h1>Subject: {this.state.subject}</h1>
            </div>
        );
    }
}

export default Book;