import React, {Component} from "react";
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
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
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const bookData = {
            isbn: this.state.isbn,
            title: this.state.title,
            subject: this.state.subject,
            copies: this.state.copies
        };
        axios
            .post("/api/books/Addbook", bookData)
            .then(res => {
                console.log(``)
            })
            .catch(err => {console.log(err)}
            );
    };


    render() {
        return(
            <div>
            <div className="container p-5 rounded mb-0 block-example border border-light">
                <Form noValidate onSubmit={this.onSubmit}>
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

                    <Form.Group as={Col} >
                        <Form.Row>
                            <Form.Label column lg={2}>
                                Title
                            </Form.Label>
                            <Col>
                                <Form.Control type="text"  id="title" placeholder="Enter Title" onChange={this.onChange} value={this.state.name} />
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Row>
                            <Form.Label column lg={2}>
                                Subject
                            </Form.Label>
                            <Col>
                                <Form.Control id="subject" type="text" placeholder="Enter book subject"  onChange={this.onChange}  value={this.state.author}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Row>
                            <Form.Label column lg={2}>
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
            </div>
            </div>
        );
    }
}
AddForm.propTypes = {
    addBook: PropTypes.func.isRequired,
};


export default AddForm;
