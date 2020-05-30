import React, { Component } from "react";
import axios from "axios";
import Book from "../layout/Book";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

class Findform extends Component{
    constructor(props){
        super(props);
        this.state = {
            isbn: "",
            book_view: false,
            book_form: null
        }
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value,

        })
    };
    make_call = () => {
        return axios
            .get(`/api/books/findbook/${this.state.isbn}`)
            .then( (response) => {
                return response.data
            }).catch(err => console.log(err))
    }
    onFindPress = () => {
        this.make_call().then(data => {
            if(data[0]){
                this.setState({
                    book_view: true,
                    book_form: <Book isbn={data[0].isbn} name={data[0].name}
                                     author={data[0].author}/>
                });
            }
            else{
                this.setState({book_view: false})
            }
        })
    };
    render() {
        return (
            <div>
            <div className="container p-5 rounded mb-0 block-example border border-light">
                <Form>
                    <Form.Group as={Col} >
                        <Form.Row>
                            <Form.Label column lg={2}>
                                ISBN
                            </Form.Label>
                            <Col>
                                <Form.Control id="isbn" type="text" placeholder="Enter ISBN " onChange={this.onChange} value={this.state.isbn}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <div className="row ml-auto">
                        <div className="col-xs-2  p-2 block-example ml-auto">
                            <Button variant="primary" type = "button" className="fa fa-search" onClick={this.onFindPress}>search</Button>
                        </div>
                        <div className="col-xs-2  p-2 block-example ">
                            <Button variant="light" type = "button" className="fa fa-undo">Reset</Button>
                        </div>
                    </div>
                </Form>
            </div>

            <div className="container p-5 rounded mb-0 block-example border border-light">
                <div className="detail_form">
                    {(this.state.book_view) ? this.state.book_form : ''}
                </div>
            </div>
            </div>
        );
    }
}
export default Findform;
