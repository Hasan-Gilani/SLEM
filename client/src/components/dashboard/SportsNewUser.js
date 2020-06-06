import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
import FlashMessage from "react-flash-message";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";

class SportsNewUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            studentid: "",
            fname: "",
            lname: "",
            error: "",
            msgSuccess: "",
            msgFail: ""
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSavePress = e => {
        this.setState({msgSuccess: null, msgFail: null});
        e.preventDefault();
        let arg = {fname: this.state.fname, lname: this.state.lname, id: this.state.studentid};
        this.makeCall(arg)
            .then(data => {
                if(data.error === true){
                    this.setState({
                        error: true,
                        msgFail: <FlashMessage duration={3000}><p style={{color: "red", fontStyle: "italic"}}>{data.message}</p></FlashMessage>
                    });
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
            // .post(`/api/students/add`, arg)
            .then(response =>{ return response.data;})
            .catch(error => { return error.response.data;});
    }
    render() {
        return(
            <div>
                <h2>Add New Student</h2>
            <div className="container p-5 rounded mb-0 block-example border border-light">

                <Form noValidate onSubmit={this.onSubmit}>
                    <Form.Group as={Col} >
                        <Form.Row>
                            <Form.Label column lg={4}>
                                Student ID
                            </Form.Label>
                            <Col>
                                <Form.Control id="studentid" type="text"  placeholder="Enter student Id " onChange={this.onChange} value={this.state.studentid}/>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Form.Label column lg={4}>
                                First Name
                            </Form.Label>
                            <Col>
                                <Form.Control type="text"  id="fname" placeholder="Enter First Name" onChange={this.onChange} value={this.state.fname} />
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Form.Label column lg={4}>
                                Last Name
                            </Form.Label>
                            <Col>
                                <Form.Control id="lname" type="text" placeholder="Enter Last Name"  onChange={this.onChange}  value={this.state.lname}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <div className="row ml-auto">
                        <div className="col-xs-2  p-2 block-example ml-auto">
                            <Button variant="primary" type = "submit" className="fa fa-save" onClick={this.onSavePress}>Save</Button>
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


export default SportsNewUser;
