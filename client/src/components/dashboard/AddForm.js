import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
import FlashMessage from "react-flash-message";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";

class AddForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isbn: "",
            title: "",
            subject: "",
            copies: "",
            error: false,
            msgSuccess: null,
            msgFail: null
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        this.setState({msgSuccess: null, msgFail: null});
        e.preventDefault();
        const bookData = { isbn: this.state.isbn, title: this.state.title, subject: this.state.subject, copies: this.state.copies};
        this.makeCall(bookData)
            .then((data) => {
                if(data.error === true){
                    this.setState({
                        error: true,
                        msgFail: <FlashMessage duration={3000}><p style={{color: "red", fontStyle: "italic"}}>{data.message}</p></FlashMessage>
                    })
                }
                else{
                    this.setState({
                        error: false,
                        msgSuccess: <FlashMessage duration={3000}><p style={{color: "green", fontStyle: "italic"}}>{data.message}</p></FlashMessage>
                    })
                }
            })
            .catch(err => console.log(err));
    }
    makeCall = bookData => {
        return axios
                .post("/api/books/Addbook", bookData)
                .then( (res) => {
                    return res.data;
                })
                .catch(err => {
                    console.log(err);
                        return err.response.data;
                    }
                );
    };


    render() {
        return(
            <div>
                <h2>Add New Book</h2>
            <div className="container p-5 rounded mb-0 block-example border border-light">
                <Form noValidate onSubmit={this.onSubmit}>
                    <Form.Group as={Col} >
                        <Form.Row>
                            <Form.Label column lg={4}>
                                ISBN
                            </Form.Label>
                            <Col>
                                <Form.Control id="isbn" type="text"  pattern="[0-9]*" minLength="13" maxLength="13" placeholder="Enter ISBN " onChange={this.onChange} value={this.state.isbn}/>
                            </Col>
                        </Form.Row>
                  
                        <Form.Row>
                            <Form.Label column lg={4}>
                                Title
                            </Form.Label>
                            <Col>
                                <Form.Control type="text"  id="title" placeholder="Enter Title" onChange={this.onChange} value={this.state.name} />
                            </Col>
                        </Form.Row>
                   
                        <Form.Row>
                            <Form.Label column lg={4}>
                                Subject
                            </Form.Label>
                            <Col>
                                <Form.Control id="subject" type="text" placeholder="Enter book subject"  onChange={this.onChange}  value={this.state.author}/>
                            </Col>
                        </Form.Row>
                 
                        <Form.Row>
                            <Form.Label column lg={4}>
                                No. of Copies
                            </Form.Label>
                            <Col>
                                <Form.Control id="copies" type="text" placeholder="No. of Copies" onChange={this.onChange} value={this.state.copies}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <div className="row ml-auto">
                        <div className="col-xs-2  p-2 block-example ml-auto">
                            <Button variant="primary" type = "submit" className="fa fa-save" >Save</Button>
                        </div>
                        <div className="col-xs-2  p-2 block-example ">
                            <Button variant="light" type = "button" className="fa fa-undo">Reset</Button>
                        </div>
                    </div>
                </Form>
                    <div>
                        {(this.state.error) ? this.state.msgFail : this.state.msgSuccess}
                    </div>
                </div>
            </div>
        );
    }
}


export default AddForm;
