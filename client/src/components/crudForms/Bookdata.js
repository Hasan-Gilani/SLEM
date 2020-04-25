import React, { Component } from 'react';
import { Media } from 'reactstrap';

class Bookdata extends Component{
    constructor(props){
        super(props);
        this.state={
            books:[
                {
                   isbn: 0,
                   name: "neha",
                   subject: "neha",
                   author: "neha" ,
                   image: "assets/images/book.png"
                },
                {
                    isbn: 1,
                    name: "gilani",
                    subject: "gilani",
                    author: "gilani" ,
                    image: "assets/images/book.png"

                 },

            ]
        };
    }
    render(){
        const bookdetails=this.state.books.map((book) =>{
            return (
                <div key={book.isbn} className="col-12 mt-5">
                    <Media tag="li">
                        <Media left middle>
                            <Media object src={book.image} alt={book.name} />
                        </Media>
                        <Media body  className="ml-5">
                            <Media heading >Name: {book.name}</Media>
                            <Media heading >Subject: {book.subject}</Media>
                            <Media heading >Author: {book.author}</Media>
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
                        {bookdetails}
                    </Media>
                </div>
            </div>
        );

    }
}
export default Bookdata;