import React, { Component } from "react";
import axios from "axios";
import StudentRecord from "./StudentRecord";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import FlashMessage from "react-flash-message";
import RenderHeader from "./RenderHeader";
class SearchStudentRecord extends Component{
    constructor(props){
        super(props);
        this.state = {
            studentid: "",
            error: true,
            msgSuccess: null,
            msgFail: null,
            displaystudent:[],
            header: <RenderHeader />
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onFindPress = () => {
        this.setState({error: false, msgSuccess: null, msgFail: null, displaystudent:[]})
        this.makeCall()
            .then(data => {
                if(data.error === true){
                    this.setState({
                        header: "",
                        error: true,
                        msgFail: <FlashMessage duration={3000}><p style={{color: "red", fontStyle: "italic"}}>{data.message}</p></FlashMessage>

                    })
                }
                else{
                    let record = data.data.record, i = 1, list = [];
                    record.books.forEach(book => {
                        list.push(<StudentRecord key={i-1} count={i}
                                                 isbn={book.isbn} studentid={this.state.studentid}
                                                 issuedate={book.bdate} duedate={book.rdate}/>)})
                    this.setState({
                        header: <RenderHeader />,
                        error: false,
                        displaystudent: list
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    makeCall = () => {
        return axios
                .get(`/api/students/findBook/${this.state.studentid}`)
                .then(ans => {
                        return ans;
                    })
                .catch(err => {
                    return err.response.data;
                });
    }
    resetAll = e => {
        e.preventDefault();
        this.setState({studentid: "", error: false,
            msgSuccess: null, msgFail: null, displaystudent:[],
            header: ""
        })
    }
    render() {
        return (
            <div>
                <h2>Search Student Loan</h2>
            <div className="row p-5 rounded mb-0 block-example border border-light">
                <Form >
                    <Form.Group as={Col}>
                        <Form.Row>
                            <Form.Label column lg={4}>
                            Student ID
                            </Form.Label>
                            <Col>
                                <Form.Control id="studentid" type="text" placeholder="Enter Student ID " onChange={this.onChange} value={this.state.studentid}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <div className="row ml-auto">
                        <div className="col-xs-2  p-2 block-example ml-auto">
                            <Button variant="primary" type = "button" className="fa fa-search" onClick={this.onFindPress}>search</Button>
                        </div>
                        <div className="col-xs-2  p-2 block-example ">
                            <Button variant="light" type = "button" className="fa fa-undo" onClick={this.resetAll}>Reset</Button>
                        </div>
                    </div>
                </Form>
            </div>
            <div className="container p-5 rounded mb-0 block-example border border-light">
                {(this.state.error) ? this.state.msgFail : this.state.header}
                {(this.state.displaystudent.length > 0) ? this.state.displaystudent : ""}
            </div>

            </div>
        );
    }
}
export default SearchStudentRecord;
