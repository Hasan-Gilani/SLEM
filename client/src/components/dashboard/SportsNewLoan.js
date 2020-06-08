import React, {Component} from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col  } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import FlashMessage from "react-flash-message";

class SportsNewLoan extends Component{
    constructor(props) {
        super(props);
        this.state = {
            goodID: "",
            studentid: "",
            issuedate: "",
            duedate:"",
            error: false,
            msgSuccess: null,
            msgFail: null
        };
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    onSubmit = e => {
        e.preventDefault();
        this.setState({msgSuccess: null, msgFail: null});
        let data = {id: this.state.studentid, goodID: this.state.goodID, bdate: this.state.issuedate, rdate: this.state.duedate};
        this.makeCall(data)
            .then((ans) => {
                if(ans.error === true){
                    this.setState({
                        error: true,
                        msgFail: <FlashMessage duration={3000}><p style={{color: "red", fontStyle: "italic"}}>{ans.message}</p></FlashMessage>
                    })
                }
                else{
                    this.setState({
                        error: false,
                        msgSuccess: <FlashMessage duration={3000}><p style={{color: "green", fontStyle: "italic"}}>{ans.message}</p></FlashMessage>
                    })
                }
            })
    }
    makeCall = data => {
        return axios
            .put("/api/recordSports/loan", data)
            .then((res) => {
                return res.data;
            })
            .catch(err => {
                return err.response.data
            });
    }
    render() {
        return(
            <div>
                <h2>New Loan</h2>
            <div className="container p-5 rounded mb-0 block-example border border-light">
                <Form noValidate onSubmit={this.onSubmit}>
                    <Form.Group as={Col} >
                        <Form.Row>
                            <Form.Label column lg={4}>
                                Student ID
                            </Form.Label>
                            <Col>
                                <Form.Control type="text"  id="studentid" placeholder="Enter Student Id" onChange={this.onChange} value={this.state.studentid} />
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Form.Label column lg={4}>
                                Good ID
                            </Form.Label>
                            <Col>
                                <Form.Control id="goodID" type="text" placeholder="Enter goodID " onChange={this.onChange} value={this.state.goodID}/>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Form.Label column lg={4}>
                                Issue Date
                            </Form.Label>
                            <Col>
                                <Form.Control id="issuedate" type="date" placeholder="Enter Issue Date"  onChange={this.onChange}  value={this.state.issuedate}/>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Form.Label column lg={4}>
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
                <div>
                    {(this.state.error) ? this.state.msgFail : this.state.msgSuccess}
                </div>
            </div>
            </div>
        );
    }
}

export default SportsNewLoan;
