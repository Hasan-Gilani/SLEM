import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col, Grid, Jumbotron } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

class NewLoan extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isbn: "",
            studentid: "",
            issuedate: "",
            duedate:""
        };
    }

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
                    
                    <Form.Group as={Col} controlId="studentid">
                        <Form.Row>
                            <Form.Label column lg={2}>
                                Student ID
                            </Form.Label>
                            <Col>
                                <Form.Control type="text"  id="studentid" placeholder="Enter Student ID" onChange={this.onChange} value={this.state.studentid} />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                        
                    <Form.Group as={Col} controlId="issuedate">
                        <Form.Row>
                            <Form.Label column lg={2}>
                                Issue Date
                            </Form.Label>
                            <Col>
                                <Form.Control id="issuedate" type="date" placeholder="Enter Issue Date"  onChange={this.onChange}  value={this.state.issuedate}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <Form.Group as={Col} controlId="duedate">
                        <Form.Row>
                            <Form.Label column lg={2}>
                                Due Date
                            </Form.Label>
                            <Col>
                                <Form.Control id="duedate" type="date" placeholder="Enter Due Date"  onChange={this.onChange}  value={this.state.duedate}/>
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

const mapStateToProps = state => ({
    isbn: state.isbn,
    studentid: state.studentid,
    issuedate: state.issuedate,
    duedate: state.duedate
});

export default connect(
    mapStateToProps, { NewLoan }
) (NewLoan);