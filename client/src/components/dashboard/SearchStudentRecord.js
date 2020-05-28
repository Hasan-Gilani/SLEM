import React, { Component } from "react";
import axios from "axios";
import StudentRecord from "../layout/StudentRecord";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Grid, Jumbotron } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

class SearchStudentRecord extends Component{
    constructor(props){
        super(props);
        this.state = {
            studentid: ""
        }
    }
    render() {
        return (
            <div>
            <div className="container p-5 rounded mb-0 block-example border border-light">
                <Form>
                    <Form.Group as={Col} controlId="studentid">
                        <Form.Row>
                            <Form.Label column lg={2}>
                            Student ID
                            </Form.Label>
                            <Col>
                                <Form.Control id="studentid" type="text" placeholder="Enter Student Id " onChange={this.onChange} value={this.state.studentid}/>
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

            </div>
        );
    }
}
export default SearchStudentRecord;