import React, { Component } from "react";
import axios from "axios";
import SportsStudentRecord from "./SportsStudentRecord";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import FlashMessage from "react-flash-message";
import SportsRenderHeader from "./SportsRenderHeader";

class SportsSearchLoan extends Component{
    constructor(props){
        super(props);
        this.state = {
            studentid: "",
            error: true,
            msgSuccess: null,
            msgFail: null,
            datafetched: null,
            displaystudent:[]
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onFindPress = () => {
        this.setState({error: false, msgSuccess: null, msgFail: null});
        this.makeCall()
            .then(data => {
                if(data.error === true){
                    this.setState({
                        error: true,
                        msgFail: <FlashMessage duration={3000}><p style={{color: "red", fontStyle: "italic"}}>{data.message}</p></FlashMessage>
                    })
                }
                else{
                    console.log('henlo deer :) ', data);
                    // console.log('henlo deer :) ', data['data']["record"].id);
                    //     let x =0;
                    //     let temp = data['data']["record"];
                    //     let str=[x].toString();
                    //     let flag=[]
                    //     while (temp["books"][str]){
                    //         let temp2=temp["books"][str];
                    //         flag.push(<SportsStudentRecord count={x+1}isbn={temp2.isbn} studentid={temp.id} issuedate={temp2.bdate} duedate={temp2.rdate} />)
                    //         x+=1
                    //         str=[x].toString();
                    //     }
                
                    this.setState({
                        error: false,
                        // displaystudent:flag
                        // msgSuccess: <FlashMessage duration={3000}><p style={{color: "green", fontStyle: "italic"}}>{data.message}</p></FlashMessage>
                        })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    makeCall = () => {
        return axios
                // .get(`/api/students/find/${this.state.studentid}`)
                .then(ans => {
                        return ans;
                    })
                .catch(err => {
                    return err.response.data;
                });
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
                            <Button variant="light" type = "button" className="fa fa-undo">Reset</Button>
                        </div>
                    </div>
                </Form>
            </div>
            <div className="container p-5 rounded mb-0 block-example border border-light">
                {(this.state.error) ? this.state.msgFail : <SportsRenderHeader />}
                {/* {(this.state.error) ? this.state.msgFail : this.state.displaystudent} */}
            </div>

            </div>
        );
    }
}
export default SportsSearchLoan;