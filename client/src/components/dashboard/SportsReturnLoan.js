import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
import FlashMessage from "react-flash-message";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";

class SportsReturnLoan extends Component{
    constructor(props) {
        super(props);
        this.state = {
            studentid: "",
            goodID:"",
            msgSuccess: null,
            msgFail: null,
            error: false
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    deleteRecord = e => {
        this.setState({msgSuccess: null, msgFail:null});
        e.preventDefault();
        this.makeCall({id: this.state.studentid, goodID: this.state.goodID})
            .then(data => {
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
    }

    makeCall = (data) => {
        return axios
            // .post("/api/records/returnBook", data)
            .then(response => {
                return response.data
            })
            .catch(err => {
                return err.response.data;
            })
    }

    render() {
        return(
            <div>
                <h2>Return Loan</h2>
            <div className="container p-5 rounded mb-0 block-example border border-light">

                <Form noValidate onSubmit={this.onSubmit}>
                    <Form.Group as={Col} >
                        <Form.Row>
                            <Form.Label column lg={4}>
                                Student ID
                            </Form.Label>
                            <Col>
                                <Form.Control id="studentid" type="text"  placeholder="Enter Student ID " onChange={this.onChange} value={this.state.studentid}/>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Form.Label column lg={4}>
                                Good ID
                            </Form.Label>
                            <Col>
                                <Form.Control id="goodID" type="text"  placeholder="Enter goodID " onChange={this.onChange} value={this.state.goodID}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <div className="row ml-auto">
                        <div className="col-xs-2  p-2 block-example ml-auto">
                            <Button variant="primary" type = "submit" className="fa fa-trash" onClick={this.deleteRecord}>Return</Button>
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


export default SportsReturnLoan;
