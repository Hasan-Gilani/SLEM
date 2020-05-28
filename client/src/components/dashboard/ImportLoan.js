import React, { Component } from "react";
import axios from "axios";
import Book from "../layout/Book";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Grid, Jumbotron } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

class ImportLoan extends Component{
    render() {
        return (
            <div>
            <div className="container p-5 rounded mb-0 block-example border border-light">
                <Form>
                    <Form.Group as={Col} controlId="loan">
                        <Form.Row>
                            <Form.Label column lg={2}>
                                Import Loans
                            </Form.Label>
                            <Col>
                                <Form.Control id="loan" type="file" />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                   
                    <div className="row ml-auto">
                        <div className="col-xs-2  p-2 block-example ml-auto">
                            <Button variant="primary" type = "button" className="fa fa-upload" onClick={this.onFindPress}>import</Button>
                        </div>
                        <div className="col-xs-2  p-2 block-example ">
                            <Button variant="light" type = "button" className="fa fa-trash-o">Discard</Button>
                        </div>
                    </div>
                </Form>
            </div>
            </div>
        );
    }
}
export default ImportLoan;