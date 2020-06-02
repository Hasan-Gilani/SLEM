import React, { Component } from 'react';
import { Media } from 'reactstrap';

class BookData extends Component{
    constructor(props){
        super(props);
        this.state= {
            books: []
        }
    }
    render(){
        const bookDetails=this.state.books.map((book) =>{
            return (
                <div key={book.isbn} className="col-12 mt-5">
                    <Media tag="li">
                        <Media left middle>
                            <Media object src={book.image} alt={book.name} />
                        </Media>
                        <Media body  className="ml-5">
                            <Media heading >Title: {book.title}</Media>
                            <Media heading >Subject: {book.subject}</Media>
                            <Media heading >Copies: {book.copies}</Media>
                            <Media heading >ISBN: {book.isbn}</Media>
                        </Media>
                    </Media>
                </div>
            );
        });
        return(
            <div className="container">
                <div className="row">
                    <Media list>
                        {bookDetails}
                    </Media>
                </div>
            </div>
        );

    }
}
export default BookData;
