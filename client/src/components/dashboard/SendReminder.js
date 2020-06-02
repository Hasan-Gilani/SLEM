import React, { Component } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import FlashMessage from "react-flash-message";
class SendReminder extends Component{
    constructor(props){
        super(props);
        this.state = {
            studentid: "",
            error: false,
            msgSuccess: null,
            msgFail: null,
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onFindPress = e => {
        this.setState({msgSuccess: null, msgFail: null});
        e.preventDefault();
        let arg = {id: this.state.studentid};
        this.makeCall(arg)
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
    makeCall = arg => {
        return axios
            .post("/api/records/sendReminder", arg)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                return err.response.data;
            });
    }
    render() {
        return (
            <div>
            <div className="container p-5 rounded mb-0 block-example border border-light">
                <Form >
                    <Form.Group as={Col}>
                        <Form.Row>
                            <Form.Label column lg={2}>
                            Students ID
                            </Form.Label>
                            <Col>
                                <Form.Control id="studentid" type="text" placeholder="Enter Students Id " onChange={this.onChange} value={this.state.studentid}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <div className="row ml-auto">
                        <div className="col-xs-2  p-2 block-example ml-auto">
                            <Button variant="primary" type = "button" className="fa fa-envelope" onClick={this.onFindPress}>Send</Button>
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
export default SendReminder;
