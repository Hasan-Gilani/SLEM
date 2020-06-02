import React, { Component } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

class SearchStudentRecord extends Component{
    constructor(props){
        super(props);
        this.state = {
            studentid: ""
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onFindPress = () => {
        let arg = {id: this.state.studentid};
        this.makeCall(arg)
            .then(value => {
                console.log(value);
            })
            .catch(err => console.log(err));
    }
    makeCall = arg => {
        return axios
                    .post("/api/students/find", arg)
                    .then(ans => {
                        return ans;
                    })
                    .catch(err => console.log(err));
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
