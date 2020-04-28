import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"
import { addBook } from "../../crudActions/addAction";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col, Grid, Jumbotron } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

class AddForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isbn: "",
            name: "",
            author: "",
            subject: ""
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const bookData = {
            isbn: this.state.isbn,
            name: this.state.name,
            author: this.state.author,
            subject: this.state.subject
        };
        this.props.addBook(bookData)
    };

    render() {
        return(
            <div>
            <div className="container p-5 rounded mb-0 block-example border border-light">
                <Form noValidate onSubmit={this.onSubmit}>
                    <Form.Group as={Col} controlId="isbn">
                        <Form.Row>
                            <Form.Label column lg={2}>
                                ISBN
                            </Form.Label>
                            <Col>
                                <Form.Control id="isbn" type="text" placeholder="Enter ISBN " onChange={this.onChange} value={this.state.isbn}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="name">
                        <Form.Row>
                            <Form.Label column lg={2}>
                                Title
                            </Form.Label>
                            <Col>
                                <Form.Control type="text"  id="name" placeholder="Enter Title" onChange={this.onChange} value={this.state.name} />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                        
                    <Form.Group as={Col} controlId="author">
                        <Form.Row>
                            <Form.Label column lg={2}>
                                Author
                            </Form.Label>
                            <Col>
                                <Form.Control id="author" type="text" placeholder="Enter Author"  onChange={this.onChange}  value={this.state.author}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <Form.Group as={Col} controlId="subject">    
                        <Form.Row>
                            <Form.Label column lg={2}>
                                Subject
                            </Form.Label>
                            <Col>
                                <Form.Control id="subject" type="text" placeholder="Enter Subject"  onChange={this.onChange}  value={this.state.subject}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <Form.Group as={Col} controlId="noofcopies">    
                        <Form.Row>
                            <Form.Label column lg={2}>
                                No. of Copies
                            </Form.Label>
                            <Col>
                                <Form.Control id="noofcopies" type="integer" placeholder="No. of Copies"/>
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
    addBook: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isbn: state.isbn,
    name: state.name,
    author: state.author,
    subject: state.subject
});

export default connect(
    mapStateToProps, { addBook }
) (AddForm);