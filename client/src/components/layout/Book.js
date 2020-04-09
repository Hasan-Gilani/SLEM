import React, { Component } from 'react';


class Book extends Component {
    render() {
        return (
            <div>
                <div>First Name: {this.props.firstName}</div>
                <div>Last Name: {this.props.lastName}</div>
                <div>Email: {this.props.email}</div>
            </div>
        );
    }
}

export default Book;